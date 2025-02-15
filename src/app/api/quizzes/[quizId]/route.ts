import { isMongoId } from "@/helpers/isMongoId";
import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { Quiz } from "@/models/quiz-model";
import { quizSchema } from "@/schemas/quiz-schema";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  await connectDB();

  try {
    const quizId = (await params).quizId;

    if (!isMongoId(quizId))
      return apiResponse({
        message: "Invalid quiz ID",
        status: 400,
      });

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return apiResponse({
        success: false,
        message: "Quiz not found",
        status: 404,
      });
    }

    return apiResponse({
      message: "Quiz fetched successfully",
    });
  } catch (error) {
    console.log("Error while getting the quiz::", error);
    return apiResponse({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
// TODO: only quiz creator is allowed to update the quiz
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  await connectDB();

  try {
    const quizId = (await params).quizId;
    const body = await req.json();
    const session = await getSession();
    if (!session)
      return apiResponse({
        success: false,
        message: "Unauthorized request",
        status: 401,
      });

    if (!session.isTeacher)
      return apiResponse({
        success: false,
        message: "Only teachers are allowed to edit a quiz.",
        status: 403,
      });

    const updatedQuizResponse = quizSchema.safeParse(body);
    if (!updatedQuizResponse.success)
      return apiResponse({
        success: false,
        message: "Invalid quiz data ",
        status: 400,
        error: parseErrors(updatedQuizResponse.error),
      });

    if (!isMongoId(quizId)) {
      return apiResponse({
        message: "Invalid quiz ID",
        status: 400,
      });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      updatedQuizResponse.data,
      { new: true }
    );

    if (!updatedQuiz) {
      return apiResponse({
        success: false,
        message: "Quiz not found",
        status: 404,
      });
    }

    return apiResponse({
      success: true,
      message: "Quiz updated successfully",
      data: updatedQuiz,
    });
  } catch (error) {
    console.log("Error while updating quiz::", error);
    return apiResponse({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}

// TODO: only quiz creator is allowed to delete the quiz
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  await connectDB();

  try {
    const quizedId = (await params).quizId;
    const session = await getSession();
    if (!session)
      return apiResponse({
        success: false,
        message: "Unauthorized request",
        status: 401,
      });

    if (!quizedId) {
      return apiResponse({
        success: false,
        status: 400,
        message: "Quiz ID is required",
      });
    }
    if (!isMongoId(quizedId)) {
      return apiResponse({
        message: "Invalid quiz ID",
        status: 400,
      });
    }
    // const deletedQuiz = await Quiz.findByIdAndDelete(quizedId);
    const targetQuiz = await Quiz.findById(quizedId);

    if (!targetQuiz)
      return apiResponse({
        message: "Quiz not found or already deleted",
        status: 404,
      });

    if (session.user?.username !== targetQuiz.createdBy)
      return apiResponse({
        status: 403,
        message: "Forbidden. Only quiz author can delete quiz",
      });

    const deletedQuiz = await Quiz.deleteOne({ _id: quizedId }).lean();

    if (deletedQuiz.deletedCount === 0) {
      return apiResponse({
        status: 404,
        message: "Course not found or already deleted",
      });
    }
    if (!isMongoId(quizedId)) {
      return apiResponse({
        message: "Invalid quiz ID",
        status: 400,
      });
    }

    return apiResponse({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting quiz::", error);
    return apiResponse({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
