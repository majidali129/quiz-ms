"use server";

import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isStudent } from "@/features/utils/is-student";
import { connectDB } from "@/lib/connect-db";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { Course } from "@/models/course-model";
import { formatDate } from "date-fns";
import { revalidatePath } from "next/cache";
import { EnrollmentStatus } from "../course-enrollments/types";

export const courseEnrollment = async (courseId: string) => {
  await connectDB();
  console.log("enrollment called");
  console.log(courseId);

  try {
    const user = await getAuth();
    if (!isStudent(user.role)) {
      return toActionState("ERROR", "Please login as student first");
    }

    const course = await Course.findById(courseId).lean();
    if (!course) {
      return toActionState("ERROR", "Course not found");
    }

    const courseEnrollment = await CourseEnrollment.findOne({
      student: user.id,
      course: courseId,
    });

    if (courseEnrollment) {
      console.log("Existing enrollment", courseEnrollment);
      if (courseEnrollment.enrollmentStatus === EnrollmentStatus.active) {
        courseEnrollment.enrollmentStatus = EnrollmentStatus.dropped;
        courseEnrollment.unEnrolledAt = formatDate(new Date(), "yyyy-MM-dd");
      } else {
        courseEnrollment.enrollmentStatus = EnrollmentStatus.active;
        courseEnrollment.unEnrolledAt = undefined;
      }

      await courseEnrollment.save({ validateBeforeSave: false });
    } else {
      const newEnrollment = { student: user.id, course: courseId, enrolledAt: formatDate(new Date(), "yyyy-MM-dd") };
      await CourseEnrollment.create(newEnrollment);
    }
  } catch (error) {
    console.log("Enrollment ERROR::", error);
    return fromErrorToActionState(error);
  }

  revalidatePath("/courses", "layout");
};
