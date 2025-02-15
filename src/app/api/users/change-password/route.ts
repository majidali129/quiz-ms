import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
import { User } from "@/models/user-model";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  await connectDB();

  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        status: 403,
        message: "Unauthorized request!",
      });
    const body = await request.json();
    const { oldPassword, newPassword } = body;

    if (!oldPassword) {
      return apiResponse({
        success: false,
        message: "Please provide old password to set new one",
        status: 400,
      });
    }
    if (!newPassword) {
      return apiResponse({
        success: false,
        message: "Please provide new password",
        status: 400,
      });
    }

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
