import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { QuizEnrollment } from "@/models/quiz-enrollment-model";
import { User } from "@/models/user-model";
import { quizEnrollmentSchema } from "@/schemas/quiz-enrollment-schema";
import { NextRequest } from "next/server";

// only for teachers
export async function GET() {
  connectDB();

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

    const quizEnrollments = await QuizEnrollment.find({ teacher: session.id });

    return apiResponse({
      message: "Enrollments fetched successfully",
      data: quizEnrollments,
    });
  } catch (error) {
    console.log("Error while getting enrollments::", error);
    return apiResponse({
      status: 500,
      message:
        error instanceof Error ? error.message : "Unknown error occured!",
    });
  }
}

// only for teacher
export async function POST(req: NextRequest) {
  connectDB();

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
        message: "Only teachers are allowed to enroll students for quiz.",
        status: 403,
      });

    const body = await req.json();
    const parsedData = quizEnrollmentSchema.safeParse(body);
    if (!parsedData.success)
      return apiResponse({
        success: false,
        message: "Invalid enrollment data!",
        status: 400,
      });

    const { registrationId } = parsedData.data;

    const isStudentExists = await User.findOne({
      registerationNo: registrationId,
    });

    if (!isStudentExists)
      return apiResponse({
        success: false,
        message: "No student found with this registration ID",
        status: 404,
      });

    const newQuizEnrollment = await QuizEnrollment.create(parsedData.data);

    return apiResponse({
      status: 201,
      message: "Student enrolled successfully",
      data: newQuizEnrollment,
    });
  } catch (error) {
    console.log("Error while enrolling the student::", error);
    return apiResponse({
      status: 500,
      message:
        error instanceof Error ? error.message : "Unknown error occured!",
    });
  }
}
