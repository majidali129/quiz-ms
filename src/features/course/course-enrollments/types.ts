export const enum EnrollmentStatus {
  active = "active",
  completed = "completed",
  dropped = "dropped",
}

export type CourseEnrollment = {
  _id: string;
  courseId: string;
  studentId: string;
  enrolledAt: string;
  enrollmentStatus: EnrollmentStatus;
  unEnrolledAt: string;
  updatedAt: Date;
  createdAt: Date;
};
