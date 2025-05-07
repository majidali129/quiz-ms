import { connectDB } from "@/lib/connect-db";
import { Course } from "@/models/course-model";
import { Course as CourseType } from "../course/types";

export const getCourses = async (): Promise<CourseType[]> => {
  await connectDB();

  const courses = await Course.find({}).populate({ path: "createdBy", select: "_id userName" }).lean().exec();

  return JSON.parse(JSON.stringify(courses));
};
