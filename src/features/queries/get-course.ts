import { connectDB } from "@/lib/connect-db";
import { Course } from "@/models/course-model";
import { Course as CourseType } from "../course/types";

export const getCourse = async (id: string): Promise<CourseType> => {
  await connectDB();
  const course = await Course.findById(id).populate({ path: "students", select: "_id userName email picture" }).populate({ path: "createdBy", select: "_id userName" }).lean().exec();
  return JSON.parse(JSON.stringify(course));
};
