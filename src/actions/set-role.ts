import { cookies } from "next/headers";
import { z } from "zod";

const roleSelectSchema = z.object({
  role: z.enum(["teacher", "student"], { message: "Invalid role selection. It can be either teacher or student" }),
});

export const selectRole = async (formData: FormData) => {
  //   await connectDB();
  try {
    const { role } = await roleSelectSchema.parse(Object.fromEntries(formData));
    console.log("choose-role called!!!", role);
    const cookieStore = await cookies();
    cookieStore.set("user-role", role, {
      httpOnly: true,
      secure: true,
    });

    console.log("Select Role:", role);
  } catch (error) {
    console.log("Role Selection Error: ", error);
  }
};
