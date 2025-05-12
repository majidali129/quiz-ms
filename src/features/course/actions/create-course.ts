"use server";

import { setCookieByKey } from "@/actions/cookies";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/queries/get-auth";
import { connectDB } from "@/lib/connect-db";
import { Course } from "@/models/course-model";
import { coursesPath } from "@/paths/paths";
import { createCourseSchema } from "@/schemas/course-schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export const createCourse = async (courseId: string | undefined, _initialState: ActionState, formData: FormData) => {
  await connectDB();

  try {
    const user = await getAuth();
    const rawData = Object.fromEntries(formData);
    console.log("rawData", rawData);
    const validatedData = await createCourseSchema.parseAsync({ ...rawData, requireApproval: rawData.requireApproval === "true" });
    console.log("validatedData", validatedData);

    if (courseId) {
      const updatedCourse = await Course.findOneAndUpdate({ _id: courseId, createdBy: user.id }, validatedData);
      if (!updatedCourse) {
        return toActionState("ERROR", "Course not found or not authorized to update", formData);
      }
    } else {
      const existingCourseWithCode = await Course.findOne({ code: validatedData.code }).lean();

      if (existingCourseWithCode) {
        return toActionState("ERROR", "Course code is already in use. Please use different one.");
      }

      const newCourse = await Course.create({ ...validatedData, createdBy: user.id });
      if (!newCourse) {
        return toActionState("ERROR", "Error while creating course. Try again later.");
      }
    }
  } catch (error) {
    console.log("Create course error::", error);
    if (error instanceof ZodError) {
      return fromErrorToActionState(error, formData);
    }
  }

  revalidatePath(coursesPath());
  if (courseId) {
    await setCookieByKey("toast", "Course updated successfully");
    revalidatePath(coursesPath());
  }
  return toActionState("SUCCESS", courseId ? "Course updated successfully" : "Course created successfully");
};
