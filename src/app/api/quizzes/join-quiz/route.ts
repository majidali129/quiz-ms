import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "better-auth/api";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const session = await getSession();
    const cookieStore = await cookies();
    const token = cookieStore.get("quizSession")?.value;
    if (!token || !session)
      return apiResponse({
        message: "Unauthorized request. Please login to proceed",
        status: 401,
        success: false,
      });

    const key = new TextEncoder().encode(process.env.SECRET_KEY!);
    const decoded = await jwtVerify(token, key);

    return apiResponse({
      success: true,
      message: "Congrats!",
    });
  } catch (error) {
    console.log("Error while joining the quiz::", error);
    if (error instanceof Error) {
      if ("code" in error && error.code === "ERR_JWT_EXPIRED") {
        return apiResponse({
          message: "Session expired. Please login again.",
          success: false,
          status: 401,
        });
      }

      return apiResponse({
        message: error.message,
        success: false,
        status: 500,
      });
    }

    return apiResponse({
      message: "Unknown error occurred",
      success: false,
      status: 500,
    });
  }
}
