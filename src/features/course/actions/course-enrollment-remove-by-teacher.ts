"use server";

import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isTeacher } from "@/features/utils/is-teacher";
import { connectDB } from "@/lib/connect-db";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { Course } from "@/models/course-model";
import { coursesPath } from "@/paths/paths";
import { revalidatePath } from "next/cache";
import { isCourseOwner } from "../utils/is-course-owner";

export const courseEnrollmentRemoveByTeacher = async (studentId: string, courseId: string) => {
  await connectDB();

  try {
    const { user } = await getAuthOrRedirect();
    if (!isTeacher(user.role)) {
      return toActionState("ERROR", "Please login as a teacher first");
    }

    const course = await Course.findById(courseId);
    if (!course || !isCourseOwner(String(course?.createdBy), user.id)) {
      return toActionState("ERROR", "Unauthorized action");
    }

    await CourseEnrollment.findOneAndDelete({ course: courseId, student: studentId });
  } catch (error) {
    console.log("Error removing course enrollment: ", error);
    return fromErrorToActionState(error);
  }
  revalidatePath(coursesPath());
  revalidatePath("/courses", "layout");

  return toActionState("SUCCESS", "Course enrollment removed successfully");
};
