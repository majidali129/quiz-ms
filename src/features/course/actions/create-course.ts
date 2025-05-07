"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/queries/get-auth";
import { connectDB } from "@/lib/connect-db";
import { Course } from "@/models/course-model";
import { coursesPath } from "@/paths/paths";
import { createCourseSchema } from "@/schemas/course-schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export const createCourse = async (_initialState: ActionState, formData: FormData) => {
  await connectDB();

  try {
    const user = await getAuth();
    const rawData = Object.fromEntries(formData);
    const validatedData = await createCourseSchema.parseAsync({ ...rawData, requireApproval: Boolean(rawData.requireApproval) });
    console.log("validatedData", validatedData);

    const existingCourseWithCode = await Course.findOne({ code: validatedData.code }).lean();

    if (existingCourseWithCode) {
      return toActionState("ERROR", "Course code is already in use. Please use different one.");
    }

    const course = await Course.create({ ...validatedData, createdBy: user.id });
    if (!course) {
      return toActionState("ERROR", "Error while creating course. Try again later.");
    }
  } catch (error) {
    console.log("Create course error::", error);
    if (error instanceof ZodError) {
      return fromErrorToActionState(error, formData);
    }
  }

  revalidatePath(coursesPath());
  return toActionState("SUCCESS", "Course created successfully");
};
