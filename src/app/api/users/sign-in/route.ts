import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { setAccessRefreshToken, setCookies } from "@/lib/session";
import { User } from "@/models/user-model";
import { loginSchema } from "@/schemas/login-schema";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const parsedData = loginSchema.safeParse(body);
    if (!parsedData.success)
      return apiResponse({
        status: 400,
        message: "Invalid login data",
        error: parseErrors(parsedData.error),
      });

    const { email, password, registerationNo, role } = parsedData.data;
    let user = null;
    // find user by email
    if (role === "teacher") {
      const userByEmail = await User.findOne({ email });
      if (!userByEmail)
        return apiResponse({
          status: 400,
          message: "No account found. Please register to proceed",
        });
      user = userByEmail;
    }

    // find user by registeration no
    if (role === "student") {
      const userByRegisterationNo = await User.findOne({ registerationNo });
      if (!userByRegisterationNo)
        return apiResponse({
          status: 400,
          message: "No account found. Please register to proceed",
        });
      user = userByRegisterationNo;
    }

    if (!user)
      return apiResponse({
        status: 400,
        message: "No account found. Please register to proceed",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return apiResponse({
        status: 401,
        message: "Invalid email or password",
      });

    // generate access / refresh tokens
    const { accessToken, refreshToken } = await setAccessRefreshToken(
      String(user._id)
    );
    await setCookies(accessToken, refreshToken);

    return apiResponse({
      message: "User logged in successfully",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknow error occured",
    });
  }
}
