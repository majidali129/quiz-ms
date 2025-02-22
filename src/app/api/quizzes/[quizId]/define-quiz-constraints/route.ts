import { isMongoId } from "@/helpers/isMongoId";
import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { Quiz } from "@/models/quiz-model";
import { quizConstraintsSchema } from "@/schemas/quiz-constraints-schema";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  await connectDB();

  try {
    const session = await getSession();
    const quizId = (await params).quizId;

    if (!session)
      return apiResponse({
        message: "Unauthorized request",
        success: false,
        status: 401,
      });

    if (!isMongoId(quizId))
      return apiResponse({
        message: "Invalid quiz ID",
        status: 400,
      });

    if (!session.isTeacher)
      return apiResponse({
        message: "Only teacher are allowed to define rules for their quiz",
        success: false,
        status: 403,
      });

    const body = await req.json();
    const parsedConstraitsData = quizConstraintsSchema.safeParse(body);
    console.log(body);
    if (!parsedConstraitsData.success)
      return apiResponse({
        message: "Invalid constraints",
        status: 400,
        success: false,
        error: parseErrors(parsedConstraitsData.error),
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const constraints = parsedConstraitsData.data;
    const quiz = await Quiz.findById(quizId);
    if (!quiz)
      return apiResponse({
        message: "Quiz not found.",
        status: 404,
      });

    quiz.constraints = {
      ...constraints,
      startDate: new Date(constraints.startDate),
    };
    await quiz.save();

    return apiResponse({
      message: "Constraints defined successfully",
      status: 201,
    });
  } catch (error) {
    console.log("Error while defining constraints", error);
    return apiResponse({
      message: error instanceof Error ? error.message : "Unknow error occured",
      status: 500,
      success: false,
    });
  }
}
