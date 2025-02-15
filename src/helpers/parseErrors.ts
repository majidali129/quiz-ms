import { ZodError } from "zod";

export const parseErrors = (error: ZodError) => {
  return Object.values(error.flatten().fieldErrors).flat();
};
