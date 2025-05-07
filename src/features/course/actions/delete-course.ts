"use server";

import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/queries/get-auth";
import { connectDB } from "@/lib/connect-db";
import { Course } from "@/models/course-model";
import { coursesPath } from "@/paths/paths";
import { revalidatePath } from "next/cache";

export const deleteCourse = async (id: string) => {
  await connectDB();

  try {
    const user = await getAuth();
    const course = await Course.findById(id);

    if (!course) {
      return toActionState("ERROR", "Course no longer exists!");
    }
    const isOwner = user.id === course.createdBy;
    if (!course || isOwner) {
      return toActionState("ERROR", "Not authorized");
    }

    await Course.findByIdAndDelete(id);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(coursesPath());
  return toActionState("SUCCESS", "Course deleted successfully");
};
