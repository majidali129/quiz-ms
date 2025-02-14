import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { User } from "@/models/user-model";
import { changePasswordSchema } from "@/schemas/change-password-schema";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session?.token)
      return apiResponse({
        status: 403,
        message: "Unauthorized request",
      });
    if (!session)
      return apiResponse({
        status: 403,
        message: "Unauthorized request!",
      });
    const body = await request.json();
    const parsedData = changePasswordSchema.safeParse(body);

    if (!parsedData.success)
      return apiResponse({
        status: 400,
        message: "Invalid data.",
        error: parseErrors(parsedData.error),
      });

    const { oldPassword, newPassword } = parsedData.data;

    const user = await User.findById(session.id);
    if (!user)
      return apiResponse({
        status: 404,
        message: "User not found",
      });

    // check for password validity
    const isPassCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPassCorrect)
      return apiResponse({
        status: 400,
        message: "Invalid old password",
      });

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save({ validateBeforeSave: false });

    return apiResponse({
      message: "Passwored updated successfully",
    });
  } catch (error) {
    console.log("Error while updating password::", error);

    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknow error occured",
    });
  }
}
