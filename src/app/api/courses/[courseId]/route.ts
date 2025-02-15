import { isMongoId } from "@/helpers/isMongoId";
import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { Course } from "@/models/course-model";
import { courseSchema } from "@/schemas/course-schema";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        success: false,
        message: "Unauthorized request. Login to proceed",
        status: 401,
      });

    if (!session.isTeacher)
      return apiResponse({
        success: false,
        message: "Forbidden. Only teachers can update a courses",
        status: 403,
      });

    const updatedCourseData = await req.json();
    const parsedUpdatedCourse = courseSchema.safeParse(updatedCourseData);
    if (!parsedUpdatedCourse.success)
      return apiResponse({
        status: 400,
        message: "Invalid course data format",
        error: parseErrors(parsedUpdatedCourse.error),
      });
    const courseId = (await params).courseId;

    if (!courseId) {
      return apiResponse({
        success: false,
        status: 400,
        message: "Course ID is required",
      });
    }

    if (!isMongoId(courseId)) {
      return apiResponse({
        message: "Invalid course ID",
        status: 400,
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      parsedUpdatedCourse.data,
      { new: true }
    );

    if (!updatedCourse)
      return apiResponse({
        status: 404,
        message: "Course not found",
      });

    return apiResponse({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log("Error while updating course::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  await connectDB();

  try {
    // const { isAuthenticated } = await verifySession();
    // if (!isAuthenticated)
    //   return apiResponse({
    //     success: false,
    //     message: "Unauthorized request. Login to proceed",
    //     status: 401,
    //   });
    const courseId = (await params).courseId;

    if (!courseId) {
      return apiResponse({
        success: false,
        status: 400,
        message: "Course ID is required",
      });
    }

    if (!isMongoId(courseId)) {
      return apiResponse({
        message: "Invalid course ID",
        status: 400,
      });
    }

    const course = await Course.findById(courseId).lean();

    if (!course)
      return apiResponse({
        status: 404,
        message: "Couser not found",
      });

    return apiResponse({
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    console.log("Error while getting course course::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        success: false,
        message: "Unauthorized request. Login to proceed",
        status: 401,
      });

    const courseId = (await params).courseId;

    if (!courseId) {
      return apiResponse({
        success: false,
        status: 400,
        message: "Course ID is required",
      });
    }

    if (!isMongoId(courseId)) {
      return apiResponse({
        message: "Invalid course ID",
        status: 400,
      });
    }

    const course = await Course.findById(courseId);
    if (!course)
      return apiResponse({
        status: 404,
        message: "Course not found",
      });

    if (session.id !== course.instructor.toString())
      return apiResponse({
        status: 403,
        message: "Forbidden. Only Course author can delete course",
      });

    const deletedCourse = await Course.deleteOne({ _id: courseId }).lean();

    if (deletedCourse.deletedCount === 0) {
      return apiResponse({
        status: 404,
        message: "Course not found or already deleted",
      });
    }

    return apiResponse({
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    console.log("Error while deleting the course::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}
