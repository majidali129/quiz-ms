import { connectDB } from "@/lib/connect-db";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { CourseEnrollment as CourseEnrollmentType, EnrollmentStatus } from "../course/course-enrollments/types";

type Query = {
  course?: string;
  student?: string;
  enrollmentStatus?: EnrollmentStatus;
};
export const getEnrollments = async (courseId?: string, studentId?: string, enrollmentStatus?: EnrollmentStatus): Promise<CourseEnrollmentType[]> => {
  await connectDB();
  const query: Query = {};
  if (enrollmentStatus) query.enrollmentStatus = enrollmentStatus;
  if (courseId) query.course = courseId;
  if (studentId) query.student = studentId;
  const studentEnrollments = await CourseEnrollment.find(query).populate({ path: "student", select: "_id userName email picture" }).lean().exec();

  return JSON.parse(JSON.stringify(studentEnrollments));
};
