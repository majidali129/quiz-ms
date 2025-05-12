"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { connectDB } from "@/lib/connect-db";
import { coursesPath } from "@/paths/paths";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";

const courseEnrollmentSchema = z.object({
  //   student: z.string().min,
});

export const courseEnrollmentByTeacher = async (courseId: string, _initialState: ActionState, formData: FormData) => {
  await connectDB();

  try {
    console.log(courseId);
  } catch (error) {
    if (error instanceof ZodError) {
      return fromErrorToActionState(error, formData);
    }
  }

  revalidatePath(coursesPath());

  return toActionState("SUCCESS", "Course enrollment successful", formData);
};
