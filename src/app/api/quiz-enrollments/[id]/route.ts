import { isMongoId } from "@/helpers/isMongoId";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { QuizEnrollment } from "@/models/quiz-enrollment-model";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        message: "Only teachers are allowed view enrollment details",
        status: 403,
      });

    const enrollmentId = (await params).id;
    if (!enrollmentId)
      return apiResponse({
        message: "Missing enrollment reference",
        status: 400,
      });

    const enrollment = await QuizEnrollment.findById(enrollmentId).lean();
    if (!enrollment)
      return apiResponse({
        message: "Enrollment not found",
        status: 404,
      });

    return apiResponse({
      message: "Enrollment fetched successfully",
      data: enrollment,
    });
  } catch (error) {
    console.log("Error while fetching enrollment::", error);
    return apiResponse({
      status: 500,
      message:
        error instanceof Error ? error.message : "Unknown error occured!",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        message: "Only teachers are allowed delete an enrollment.",
        status: 403,
      });

    const enrollmentId = (await params).id;
    if (!enrollmentId)
      return apiResponse({
        message: "Missing enrollment reference",
        status: 400,
      });

    if (!isMongoId(enrollmentId)) {
      return apiResponse({
        message: "Invalid quiz enrollment ID",
        status: 400,
      });
    }

    const enrollment = await QuizEnrollment.findById(enrollmentId).lean();

    if (!enrollment)
      return apiResponse({
        message: "Quiz enrollment not found",
        status: 404,
      });
    if (session.id !== enrollment.teacher.toString())
      return apiResponse({
        status: 403,
        message: "Forbidden. Only teacher can delete an enrollment",
      });

    const removedEnrollment = await QuizEnrollment.findByIdAndDelete({
      enrollmentId,
    });
    if (!removedEnrollment)
      return apiResponse({
        message: "Enrollment not found or already removed",
        status: 404,
      });

    return apiResponse({
      message: "Enrollment removed successfully",
    });
  } catch (error) {
    console.log("Error while deleting enrollment::", error);
    return apiResponse({
      status: 500,
      message:
        error instanceof Error ? error.message : "Unknown error occured!",
    });
  }
}
