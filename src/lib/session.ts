// import { ROLE, User } from "@/models/user-model";
// import { JWTPayload, SignJWT, errors, jwtVerify } from "jose";
// import mongoose from "mongoose";
// import { cookies } from "next/headers";
// import { connectDB } from "./connect-db";

// interface IPayload {
//   id: string;
// }
// const encrypt = async (payload: { id: string }, secret: string, expiry: string): Promise<string> => {
//   const key = new TextEncoder().encode(secret);
//   return await new SignJWT(payload as JWTPayload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(expiry).sign(key);
// };

// export const decrypt = async (token: string, secret: string): Promise<IPayload | null> => {
//   try {
//     const key = new TextEncoder().encode(secret);

//     const session = await jwtVerify(token, key);
//     return session.payload as { id: string };
//   } catch (error) {
//     if (error instanceof errors.JWSSignatureVerificationFailed) {
//       throw new Error("Session expired. Please login again.");
//     }

//     return null;
//   }
//   //  payload: { id: '67b0316a55b91a0d2e28cf77', iat: 1739777251, exp: 1739863651 }
// };

// export const generateAccessToken = async (userId: string) => {
//   return await encrypt({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, process.env.ACCESS_TOKEN_EXPIRY!);
// };
// export const generateRefreshToken = async (userId: string) => {
//   return await encrypt({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, process.env.REFRESH_TOKEN_EXPIRY!);
// };

// export const setAccessRefreshToken = async (id: string) => {
//   await connectDB();
//   try {
//     const user = await User.findById({
//       _id: new mongoose.Types.ObjectId(id),
//     });
//     if (!user) throw new Error("User not found to geenerate tokens");
//     const accessToken = await generateAccessToken(id);
//     const refreshToken = await generateRefreshToken(id);

//     user.refreshToken = refreshToken;
//     await user.save();

//     return { accessToken, refreshToken };
//   } catch (error) {
//     console.log("Error while creating tokens", error);
//     throw new Error("Failed to generate tokens");
//   }
// };

// export const getSession = async () => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("accessToken")?.value;
//   if (!token) return null;

//   const payload = await decrypt(token, process.env.ACCESS_TOKEN_SECRET!);
//   if (!payload) return null;
//   const id: string = payload.id;
//   const user = await User.findById(id).select("-refreshToken -password -__v");
//   const isTeacher = user?.role === ROLE.teacher;

//   return { token, id, role: user?.role, user, isTeacher };
// };

// export const verifySession = async () => {
//   const session = await getSession();
//   // if (!session?.user) redirect("/login");

//   return {
//     isAuthenticated: true,
//     token: session?.token,
//   };
// };

// export const setCookies = async (aToken: string, rToken: string) => {
//   const cookieStore = await cookies();
//   const options = { secure: true, httpOnly: true, sameSite: true };

//   cookieStore.set("accessToken", aToken, options);
//   cookieStore.set("refreshToken", rToken, options);
// };

// export const deleteSession = async () => {
//   const cookieStore = await cookies();
//   cookieStore.delete("accessToken");
//   cookieStore.delete("refreshToken");
//   cookieStore.delete("quizJoinSession");
//   // & redirect user to login
// };
