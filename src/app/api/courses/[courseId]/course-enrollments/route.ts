import { isMongoId } from "@/helpers/isMongoId";
import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { courseEnrollmentSchema } from "@/schemas/course-enrollment-schema";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        message: "Unauthorized request. Login to proceed",
        status: 401,
      });

    const courseEnrollmentData = await req.json();
    const parsedCourseEnrollmentData =
      courseEnrollmentSchema.safeParse(courseEnrollmentData);
    if (!parsedCourseEnrollmentData.success) {
      return apiResponse({
        success: false,
        message: "Invalid course enrollment data",
        error: parseErrors(parsedCourseEnrollmentData.error),
      });
    }

    const courseId = (await params).courseId;
    if (!isMongoId(courseId)) {
      return apiResponse({
        message: "Invalid course ID",
        status: 400,
      });
    }
    // check if currently logged In student already enrolled
    const isAlreadyEnrolled = await CourseEnrollment.findOne({
      course: courseId,
      student: session.id,
    });

    if (isAlreadyEnrolled)
      return apiResponse({
        message: "You are already enrolled in this course",
        status: 400,
      });

    const courseEnrollment = await CourseEnrollment.create({
      ...parsedCourseEnrollmentData.data,
      student: session.id,
      course: courseId,
    });

    if (!courseEnrollment)
      return apiResponse({
        message: "Failed to enroll in the course",
        status: 500,
      });

    return apiResponse({
      message: "You've enrolled successfully",
      status: 201,
      data: courseEnrollment,
    });
  } catch (error) {
    console.log("Error while creating course::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}

// handle all enrolled courses by student
export async function GET() {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        message: "Unauthorized request. Login to proceed",
        status: 401,
      });

    const enrolledCoursesByStudent = await CourseEnrollment.find({
      student: session.id,
    }).populate("course");

    return apiResponse({
      message: "Successfully retrieved enrolled courses",
      data: enrolledCoursesByStudent,
    });
  } catch (error) {
    console.log("Error while creating course::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}
