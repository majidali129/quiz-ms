import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateQuizSession = async (quizSession: string) => {
  try {
    const key = new TextEncoder().encode(process.env.SECRET_KEY!);
    const decoded = await jwtVerify(quizSession, key);
    return decoded;
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ERR_JWT_EXPIRED"
    ) {
      throw new Error(
        "Your session to join for quiz has been expired. Please apply again."
      );
    }
    throw new Error("Invalid session. Please apply for the quiz first.");
  }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const session = await getSession();
    const cookieStore = await cookies();
    const quizSession = cookieStore.get("quizJoinSession")?.value;
    if (!session)
      return apiResponse({
        message: "Unauthorized request. Please login to proceed",
        status: 401,
        success: false,
      });

    if (!quizSession)
      return apiResponse({
        message:
          "Invalid or missing the session. Please apply for the quiz first.",
        status: 403,
        success: false,
      });

    const { payload } = await validateQuizSession(quizSession);

    return apiResponse({
      message: "Congrats! You can now join the quiz.",
      data: { quizId: payload.id },
    });
  } catch (error) {
    if (error instanceof Error) {
      return apiResponse({
        message: error.message, // Use the error message from the utility function
        success: false,
        status: error.message.includes("expired") ? 403 : 401, // Use appropriate status codes
      });
    }

    // Handle unknown errors
    return apiResponse({
      message: "Unknown error occurred",
      success: false,
      status: 500,
    });
  }
}
