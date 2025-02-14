import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/session";
// import { getSession } from "better-auth/api";

export async function GET() {
  await connectDB();
  try {
    const session = await getSession();
    if (!session)
      return apiResponse({
        status: 403,
        message: "Unauthorized request",
      });

    return apiResponse({
      message: "Profile fetched successfully",
      data: { user: session.user },
    });
  } catch (error) {
    console.log("Error while gettig profile::", error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occured",
    });
  }
}
