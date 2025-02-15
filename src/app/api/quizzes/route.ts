import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
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
        message: "Unauthorized request",
        status: 401,
      });

    if (!session.isTeacher)
      return apiResponse({
        success: false,
        message: "Only teachers are allowed to view enrollments.",
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
    });

    if (quizByTitle)
      return apiResponse({
        message: "Quiz with title alreday exists. Please choose other one",
        status: 400,
      });

    const quiz = await Quiz.create({
      ...quizParsedData.data,
      createdBy: session.user?.username,
    });
    if (!quiz)
      return apiResponse({
        success: false,
        message: "Failed to create quiz. Please try again later.",
        status: 500,
      });
  } catch (error) {
    console.log("Error while uploading quiz::", error);
    return apiResponse({
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

    // if (!session.isTeacher)
    //   return apiResponse({
    //     success: false,
    //     message: "Only teachers are allowed to view enrollments.",
    //     status: 403,
    //   });

    let quizzes = [];

    if (session.isTeacher) {
      quizzes = await Quiz.find({
        createdBy: session.user!.username,
      }).populate("courseId");
    }

    quizzes = await Quiz.find().populate({
      path: "teacher",
      select: "username fullName -__v",
    });

    return apiResponse({
      message: "All quized fetched successfully",
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
