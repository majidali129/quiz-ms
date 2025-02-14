import { ROLE, User } from "@/models/user-model";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { connectDB } from "./connectDB";

interface IPayload {
  id: string;
}
const encrypt = async (
  payload: { id: string },
  secret: string,
  expiry: string
): Promise<string> => {
  const key = new TextEncoder().encode(secret);
  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(key);
};

export const decrypt = async (
  token: string,
  secret: string
): Promise<IPayload> => {
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key);

  return payload as { id: string; exp: number };
};

export const generateAccessToken = async (userId: string) => {
  return await encrypt(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET!,
    process.env.ACCESS_TOKEN_EXPIRY!
  );
};
export const generateRefreshToken = async (userId: string) => {
  return await encrypt(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET!,
    process.env.REFRESH_TOKEN_EXPIRY!
  );
};

export const setAccessRefreshToken = async (id: string) => {
  await connectDB();
  try {
    const user = await User.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!user) throw new Error("User not found to geenerate tokens");
    const accessToken = await generateAccessToken(id);
    const refreshToken = await generateRefreshToken(id);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error while creating tokens", error);
    throw new Error("Failed to generate tokens");
  }
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;

  const payload = await decrypt(token, process.env.ACCESS_TOKEN_SECRET!);
  const id: string = payload.id;
  const user = await User.findById(id).select("-refreshToken -password -__v");

  return { token, id, role: user?.role, user };
};

export const verifySession = async () => {
  const session = await getSession();
  // if (!session?.user) redirect("/login");

  return {
    isAuthenticated: true,
    token: session?.token,
  };
};

export const getRole = async (): Promise<ROLE | undefined> => {
  const session = await getSession();

  return session?.role;
};

export const roleIsTeacher = async (requiredRole: ROLE): Promise<boolean> => {
  const userRole = await getRole();
  return userRole === requiredRole;
};

export const setCookies = async (aToken: string, rToken: string) => {
  const cookieStore = await cookies();
  const options = { secure: true, httpOnly: true, sameSite: true };

  cookieStore.set("accessToken", aToken, options);
  cookieStore.set("refreshToken", rToken, options);
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", "");
  cookieStore.set("refreshToken", "");

  // & redirect user to login
};

// TODO: refresh Access token on session expiry
