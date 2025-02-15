import { parseErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/models/user-model";
import { signupSchema } from "@/schemas/signup-schema";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  connectDB();
  try {
    const body = await request.json();
    const parsedUserData = signupSchema.safeParse(body);
    console.log(parsedUserData.data);

    if (!parsedUserData.success)
      return apiResponse({
        status: 400,
        message: "Invalid user data",
        error: parseErrors(parsedUserData.error),
      });

    const { username, email, password, registerationNo, role } =
      parsedUserData.data;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser)
      return apiResponse({
        status: 400,
        message: "User already exists with these credentials",
      });

    if (role === "student") {
      const existingStudent = await User.findOne({
        registerationNo,
      });
      if (existingStudent)
        return apiResponse({
          status: 400,
          message: "Registeration no already used",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...parsedUserData.data,
      password: hashedPassword,
    });

    if (!user)
      return apiResponse({
        status: 400,
        message: "We are facing some issue in registeration. Try again later",
      });

    return apiResponse({
      status: 201,
      message: "User registed successfully",
    });
  } catch (error) {
    console.log(error);
    return apiResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Unknow error occured",
    });
  }
}
