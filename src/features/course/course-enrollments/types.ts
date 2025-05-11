export const enum EnrollmentStatus {
  active = "active",
  completed = "completed",
  dropped = "dropped",
}

export type CourseEnrollment = {
  _id: string;
  course: string;
  student: { _id: string; userName: string; email: string; picture: string };
  enrolledAt: string;
  enrollmentStatus: EnrollmentStatus;
  unEnrolledAt: string;
  updatedAt: Date;
  createdAt: Date;
};
