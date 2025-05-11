import { connectDB } from "@/lib/connect-db";
import { Course } from "@/models/course-model";
import { Course as CourseType } from "../course/types";

export const getCourses = async (teacherId?: string): Promise<CourseType[]> => {
  await connectDB();

  if (teacherId) {
    return JSON.parse(JSON.stringify(await Course.find({ createdBy: teacherId }).populate({ path: "createdBy", select: "_id userName" }).lean().exec()));
  }

  return JSON.parse(JSON.stringify(await Course.find().populate({ path: "createdBy", select: "_id userName" }).lean().exec()));
};
