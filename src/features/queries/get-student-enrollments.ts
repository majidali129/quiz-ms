import { connectDB } from "@/lib/connect-db";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { CourseEnrollment as CourseEnrollmentType } from "../course/course-enrollments/types";

export const getStudentEnrollments = async (id: string): Promise<CourseEnrollmentType[]> => {
  await connectDB();
  const studentEnrollments = await CourseEnrollment.find({ studentId: id }).lean().exec();

  return JSON.parse(JSON.stringify(studentEnrollments));
};
