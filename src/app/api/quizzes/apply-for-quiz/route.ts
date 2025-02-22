import calculateTimeDifference from "@/helpers/calculateTimeDifference";
import { isMongoId } from "@/helpers/isMongoId";
import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { Quiz } from "@/models/quiz-model";
import { applyQuizSchema } from "@/schemas/quiz-apply-schema";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const generateQuizJoinSession = async (
  payload: { id: string },
  expiry: string
) => {
  const key = new TextEncoder().encode(process.env.SECRET_KEY!);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(key);
};

const setQuizJoinCookie = async (id: string, expiry: string) => {
  const cookieStore = await cookies();
  const quizJoinSession = await generateQuizJoinSession({ id }, expiry);

  cookieStore.set("quizJoinSession", quizJoinSession, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session) {
      return apiResponse({
        message: "Unauthorized request. Please login to proceed",
        status: 401,
        success: false,
      });
    }

    const body = await req.json();
    const parsedData = applyQuizSchema.safeParse(body);
    if (!parsedData.success) {
      return apiResponse({
        message: "Quiz ID required or invalid ID",
        success: false,
        status: 400,
        error: parseErrors(parsedData.error),
      });
    }

    const quizId = parsedData.data.quizId;
    if (!isMongoId(quizId)) {
      return apiResponse({
        message: "Invalid quiz ID",
        status: 400,
        success: false,
      });
    }

    const quiz = await Quiz.findById(quizId).lean();
    if (!quiz) {
      return apiResponse({
        message: "Somehow quiz not found!",
        status: 404,
        success: false,
      });
    }

    if (quiz.constraints) {
      const quizConstraints = quiz.constraints;
      const startDate = new Date(quizConstraints.startDate); // Already in ISO format
      const startTime = quizConstraints.startTime; // "15:30:00"

      const currentDate = new Date();
      const currentTime = currentDate.toTimeString().split(" ")[0];

      // Normalize dates to UTC for comparison
      const startDateUTC = new Date(
        Date.UTC(
          startDate.getUTCFullYear(),
          startDate.getUTCMonth(),
          startDate.getUTCDate()
        )
      );
      const currentDateUTC = new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate()
        )
      );

      if (isBefore(currentDateUTC, startDateUTC)) {
        // User is applying before the start date
        await setQuizJoinCookie(session.id, "5m");
        return apiResponse({
          message:
            "You’re all set! You can now join the quiz. Your joining session will expire in 5 minutes. Make sure to join the quiz before the session ends.",
        });
      } else if (isAfter(currentDateUTC, startDateUTC)) {
        // User is applying after the start date
        return apiResponse({
          message: "The quiz has expired. You cannot join.",
          status: 400,
          success: false,
        });
      } else if (isSameDay(currentDateUTC, startDateUTC)) {
        // User is applying on the start date
        const [hours, minutes, seconds] = calculateTimeDifference(
          startTime,
          currentTime
        );
        if (currentTime < startTime) {
          const expiryInMins = minutes > 5 ? 5 : minutes;
          await setQuizJoinCookie(
            session.id,
            minutes ? `${expiryInMins}m` : `${seconds}s`
          );
          return apiResponse({
            message: `You have been granted access to join the quiz. Your joining session will expire in ${
              expiryInMins
                ? `${expiryInMins} minute${expiryInMins > 1 ? "s" : ""}`
                : `${seconds} second${seconds > 1 ? "s" : ""}`
            }. Please ensure you join the quiz before the session ends.`,
          });
        } else {
          // User is applying after the start time
          return apiResponse({
            message:
              "The quiz has already started, and late entries are not allowed. Please review the quiz schedule and plan accordingly for future quizzes.",
            status: 400,
            success: false,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error while applying for quiz:", error);
    return apiResponse({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      status: 500,
      success: false,
    });
  }
}

/**
 return apiResponse({
  message: "The quiz has already started, and late entries are not allowed. Please review the quiz schedule and plan accordingly for future quizzes.",
  status: 400,
  success: false,
});

return apiResponse({
  message: "Oops! You missed the start time for this quiz. Don’t worry—check the schedule and join the next one!",
  status: 400,
  success: false,
});

return apiResponse({
  message: "The quiz has already begun, and late entries are not permitted. Keep an eye on the schedule for upcoming quizzes—we’d love to have you join next time!",
  status: 400,
  success: false,
});
 **/
