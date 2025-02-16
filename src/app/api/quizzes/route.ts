import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { Course } from "@/models/course-model";
import { Quiz } from "@/models/quiz-model";
import { quizSchema } from "@/schemas/quiz-schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        success: false,
        message: "Unauthorized request! login to proceed",
        status: 401,
      });

    if (!session.isTeacher)
      return apiResponse({
        success: false,
        message: "Forbidden!. Only teachers are allowed to upload a quiz",
        status: 403,
      });

    const quizBody = await req.json();
    const quizParsedData = quizSchema.safeParse(quizBody);

    if (!quizParsedData.success)
      return apiResponse({
        success: false,
        message: "Invalid quiz data ",
        status: 400,
        error: parseErrors(quizParsedData.error),
      });

    const quizByTitle = await Quiz.findOne({
      title: quizParsedData.data.title,
    }).lean();

    if (quizByTitle)
      return apiResponse({
        success: false,
        message: "Quiz with title alreday exists. Please choose other one",
        status: 400,
      });

    const newQuiz = {
      ...quizParsedData.data,
      createdBy: session.user?.username,
    };

    const quiz = await Quiz.create(newQuiz);

    if (!quiz)
      return apiResponse({
        success: false,
        message: "Failed to create quiz. Please try again later.",
        status: 500,
      });

    return apiResponse({
      status: 201,
      message: "Quiz uploaded successfully",
      data: quiz,
    });
  } catch (error) {
    console.log("Error while uploading quiz::", error);
    return apiResponse({
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}

// any student can view available quizzes

export async function GET() {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        success: false,
        message: "Unauthorized request",
        status: 401,
      });

    let quizzes = [];

    if (session.isTeacher) {
      quizzes = await Quiz.find({ createdBy: session.user!.username }).populate(
        { path: "course", model: Course }
      );
    } else {
      quizzes = await Quiz.find().populate({
        path: "course",
        select: "title category level _id",
      });
    }

    return apiResponse({
      message: "All quizzes fetched successfully",
      data: quizzes,
    });
  } catch (error) {
    console.log("Error while loading all quizzes::", error);
    return apiResponse({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
