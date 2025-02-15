import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { Course } from "@/models/course-model";
import { courseSchema } from "@/schemas/course-schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        message: "Unauthorized request",
        status: 401,
      });

    if (!session.isTeacher)
      return apiResponse({
        message: "Forbidden: Only teachers can create courses",
        status: 403,
      });

    const body = await req.json();
    const parsedCourseData = courseSchema.safeParse(body);
    if (!parsedCourseData.success)
      return apiResponse({
        status: 400,
        message: "Invalid course data format",
        error: parseErrors(parsedCourseData.error),
      });

    const courseByTitle = await Course.findOne({
      title: parsedCourseData.data.title,
    });

    if (courseByTitle)
      return apiResponse({
        status: 400,
        message: "Course with this title already exists",
      });

    const newCourse = Course.create({
      ...parsedCourseData.data,
      instructor: session.id,
    });

    if (!newCourse)
      return apiResponse({
        status: 500,
        message: "Failed to create course",
      });

    return apiResponse({
      status: 201,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log("Error while creating course::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}
export async function GET() {
  await connectDB();

  try {
    // const { isAuthenticated } = await verifySession();
    const session = await getSession();
    if (!session)
      return apiResponse({
        message: "Unauthorized request. Login to proceed",
        status: 401,
      });

    let courses = [];

    // it'll get only courses for currently logged in teacher. not of all
    if (session.isTeacher) {
      courses = await Course.find({ instructor: session.id }).populate({
        path: "instructor",
        select: "username _id fullName",
      });
    }

    courses = await Course.find().populate({
      path: "instructor",
      select: "username _id fullName",
    });

    return apiResponse({
      message: "Courses fetched successfully",
      status: 200,
      data: {
        courses,
        totalCourses: courses.length,
      },
    });
  } catch (error) {
    console.log("Error while creating course::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}
