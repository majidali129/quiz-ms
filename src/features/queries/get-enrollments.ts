import { connectDB } from "@/lib/connect-db";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { CourseEnrollment as CourseEnrollmentType, EnrollmentStatus } from "../course/course-enrollments/types";

type Query = {
  courseId?: string;
  studentId?: string;
  enrollmentStatus?: EnrollmentStatus;
};
export const getEnrollments = async (courseId?: string, studentId?: string, enrollmentStatus?: EnrollmentStatus): Promise<CourseEnrollmentType[]> => {
  await connectDB();
  const query: Query = {};
  if (enrollmentStatus) query.enrollmentStatus = enrollmentStatus;
  if (courseId) query.courseId = courseId;
  if (studentId) query.studentId = studentId;
  const studentEnrollments = await CourseEnrollment.find(query).lean().exec();

  return JSON.parse(JSON.stringify(studentEnrollments));
};
