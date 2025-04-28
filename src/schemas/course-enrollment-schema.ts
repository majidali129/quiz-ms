import { z } from "zod";

export const courseEnrollmentSchema = z.object({
  enrollmentDate: z.coerce.date(),
  enrollmentStatus: z
    .enum(["active", "completed", "dropped"])
    .default("active"),
});
