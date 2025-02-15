import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { deleteSession, getSession } from "@/lib/session";
import { User } from "@/models/user-model";

export async function POST() {
  await connectDB();

  try {
    const session = await getSession();
    if (!session) {
      return apiResponse({
        success: false,
        message: "No active session found",
        status: 400,
      });
    }

    const user = await User.findById(session.id);
    if (!user)
      return apiResponse({
        message: "User no longer exist.",
        status: 404,
      });

    user.refreshToken = undefined;

    await deleteSession();
    await user.save();

    return apiResponse({
      message: "User logout successfully.",
    });
  } catch (error) {
    console.log("Error while logging out::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}
