import { isMongoId } from "@/helpers/isMongoId";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: { params: Promise<{ courseId: string; courseEnrollmentId: string }> }
) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        message: "Unauthorized request. Login to proceed",
        status: 401,
      });

    const courseEnrollmentId = (await params).courseEnrollmentId;
    if (!isMongoId(courseEnrollmentId)) {
      return apiResponse({
        message: "Invalid course enrollment ID",
        status: 400,
      });
    }

    // only student can delete it
    const deletedCourseEnrollment = await CourseEnrollment.findByIdAndDelete({
      _id: courseEnrollmentId,
      student: session.id,
    });

    if (!deletedCourseEnrollment)
      return apiResponse({
        message: "Course enrollment not found",
        status: 404,
      });

    return apiResponse({
      message: "Course enrollment dropped successfully",
      data: deletedCourseEnrollment,
    });
  } catch (error) {
    console.log("Error while deleting the couser enrollment::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: { params: Promise<{ courseId: string; courseEnrollmentId: string }> }
) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        message: "Unauthorized request. Login to proceed",
        status: 401,
      });

    const courseEnrollmentId = (await params).courseEnrollmentId;
    if (!isMongoId(courseEnrollmentId)) {
      return apiResponse({
        message: "Invalid course enrollment ID",
        status: 400,
      });
    }

    const courseEnrollment = await CourseEnrollment.findOne({
      _id: courseEnrollmentId,
      student: session.id,
    }).lean();

    if (!courseEnrollment)
      return apiResponse({
        message: "Course enrollment not found",
        status: 404,
      });

    return apiResponse({
      message: "Course enrollment fetched successfully",
      data: courseEnrollment,
    });
  } catch (error) {
    console.log("Error while getting couser enrollment::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: { params: Promise<{ courseId: string; courseEnrollmentId: string }> }
) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        message: "Unauthorized request. Login to proceed",
        status: 401,
      });

    const courseEnrollmentId = (await params).courseEnrollmentId;
    if (!isMongoId(courseEnrollmentId)) {
      return apiResponse({
        message: "Invalid course enrollment ID",
        status: 400,
      });
    }

    const { status } = await req.json();

    // only student can delete it
    const updatedCourse = await CourseEnrollment.findByIdAndUpdate(
      courseEnrollmentId,
      {
        $set: { enrollmentStatus: status },
      },
      { new: true }
    );

    if (!updatedCourse)
      return apiResponse({
        message: "Course enrollment not found",
        status: 404,
      });

    return apiResponse({
      message: "Course enrollment updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log("Error while updating the couser enrollment::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}
