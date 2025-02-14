import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { deleteSession } from "@/lib/session";

export default async function GET() {
  await connectDB();

  try {
    await deleteSession();
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
