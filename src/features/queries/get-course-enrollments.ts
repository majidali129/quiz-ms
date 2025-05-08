import { connectDB } from "@/lib/connect-db";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { CourseEnrollment as CourseEnrollmentType } from "../course/course-enrollments/types";

export const getCourseEnrollments = async (id: string): Promise<CourseEnrollmentType[]> => {
  await connectDB();
  const courseEnrollments = await CourseEnrollment.find({ courseId: id }).lean().exec();

  return JSON.parse(JSON.stringify(courseEnrollments));
};
