import { z } from "zod";

export const courseEnrollmentSchema = z.object({
  //   teacher: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid teacher ID"),
  course: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
  student: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid student ID"),
  enrollmentDate: z.date().default(() => new Date()),
  enrollmentStatus: z
    .enum(["active", "completed", "dropped"])
    .default("active"),
});
