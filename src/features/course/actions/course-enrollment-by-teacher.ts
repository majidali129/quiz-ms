"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isTeacher } from "@/features/utils/is-teacher";
import { connectDB } from "@/lib/connect-db";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { Course } from "@/models/course-model";
import { User } from "@/models/user-model";
import { coursesPath } from "@/paths/paths";
import { formatDate } from "date-fns";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";

const studentEnrollmentSchema = z.object({
  studentEmail: z.string().min(1, "Email is required").max(191).email("Invalid email address"),
});
export const courseEnrollmentByTeacher = async (courseId: string, _initialState: ActionState, formData: FormData) => {
  await connectDB();

  try {
    const user = await getAuth();
    if (!isTeacher(user.role)) {
      return toActionState("ERROR", "Please login as a teacher first");
    }

    const course = await Course.findById(courseId).lean();
    if (!course) {
      return toActionState("ERROR", "Course not found");
    }

    const validatedData = await studentEnrollmentSchema.parseAsync(Object.fromEntries(formData));

    const student = await User.findOne({ email: validatedData.studentEmail });
    if (!student) {
      return toActionState("ERROR", "Student not found");
    }

    const courseEnrollment = await CourseEnrollment.findOne({
      student: student._id,
      course: courseId,
    });

    if (courseEnrollment) {
      return toActionState("ERROR", "Student is already enrolled in this course");
    }

    const newEnrollment = { student: student._id, course: courseId, enrolledAt: formatDate(new Date(), "yyyy-MM-dd") };
    await CourseEnrollment.create(newEnrollment);
  } catch (error) {
    if (error instanceof ZodError) {
      return fromErrorToActionState(error, formData);
    }
  }

  revalidatePath(coursesPath());
  revalidatePath("/courses", "layout");

  return toActionState("SUCCESS", "Course enrollment successful", formData);
};
