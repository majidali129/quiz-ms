import { EmptyPlayceholder } from "@/components/empty-place-holder";
import { getAuth } from "@/features/auth/queries/get-auth";
import { cn } from "@/lib/utils";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { EnrollmentStatus } from "../course-enrollments/types";
import { Course } from "../types";
import { CourseCard } from "./course-card";

export type CourseEnrollmentType = {
  _id: string;
  course: Course;
  student: { _id: string; userName: string; email: string; picture: string };
  enrolledAt: string;
  enrollmentStatus: EnrollmentStatus;
  unEnrolledAt: string;
  updatedAt: Date;
  createdAt: Date;
};
export const MyCoursesList = async () => {
  const user = await getAuth();
  const enrollments = JSON.parse(
    JSON.stringify(
      await CourseEnrollment.find({ student: user.id })
        .populate({
          path: "course",
          populate: {
            path: "createdBy",
            select: "_id userName",
          },
        })
        .populate({ path: "student", select: "_id userName email picture" })
    )
  ) as CourseEnrollmentType[];
  return (
    <div className={cn("p-4 space-y-7")}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl tracking-wide">Courses ({enrollments.length})</h2>
      </div>
      {enrollments.length ? (
        <ul className="grid md:grid-cols-2 gap-3.5 xl:grid-cols-3">{enrollments.length && enrollments.map((enrollment) => <CourseCard key={enrollment._id} course={enrollment.course} />)}</ul>
      ) : (
        <EmptyPlayceholder />
      )}
    </div>
  );
};
