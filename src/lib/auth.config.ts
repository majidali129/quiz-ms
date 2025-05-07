import { getCookieByKey } from "@/actions/cookies";
import { User } from "@/models/user-model";
import { signInSchema } from "@/schemas/sign-in-schema";
import bcrypt from "bcryptjs";
import type { NextAuthConfig, User as UserType } from "next-auth";
import { default as Credentials } from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectDB } from "./connect-db";

export const authConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        return { ...profile };
      },
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      async authorize(credentials) {
        await connectDB();
        let user = null;
        console.log("authorized called!!!");

        const fData = new FormData();
        fData.append("email", credentials.email as string);
        fData.append("password", credentials.password as string);
        fData.append("role", credentials.role as string);

        const parsedData = signInSchema.safeParse(Object.fromEntries(fData));
        if (parsedData.success) {
          const { email, password } = parsedData.data;

          user = await User.findOne({ email }).lean();

          if (!user || !user.password) {
            // throw new Error("Account not found");
            console.log("Account not found");
            return null;
          }

          const passwordMatch = await bcrypt.compare(password as string, user.password);

          if (passwordMatch) {
            return {
              id: user._id.toString(),
              userName: user.userName,
              email: user.email,
              role: user.role,
              picture: user.picture,
            } as UserType;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // authorized: async ({ auth }) => {
    //   return !!auth;
    // },
    async signIn({ user, account, profile }) {
      await connectDB();

      try {
        const selectedRole = await getCookieByKey("user-role");
        if (account?.provider === "google") {
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            user.id = existingUser._id.toString();
            user.userName = existingUser.userName;
            user.email = existingUser.email;
            user.role = existingUser.role;
            user.picture = existingUser.picture!;

            return true;
          } else {
            const newUser = await User.create({
              userName: user.email?.split("@")[0],
              fullName: `${profile?.given_name} ${profile?.family_name}`,
              email: user.email,
              picture: profile?.picture,
              provider: account.provider,
              providerId: account.providerAccountId,
              role: selectedRole,
            });

            user.userName = newUser.userName;
            user.role = newUser?.role;
            user.id = newUser._id.toString();
            user.registerationId = newUser?.registerationId;
            return true;
          }
        }

        return true;
      } catch (error) {
        console.log("SignIn Error: ", error);
        throw new Error("Error during sign-in");
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.userName = user.userName;
        token.role = user.role;
        token.id = user.id;
        token.picture = user.picture;
        token.registerationId = user.registerationId;
      }

      return token;
    },

    session({ session, token }) {
      session.user.userName = token.userName;
      session.user.id = token.id;
      session.user.picture = token.picture;
      session.user.role = token.role;
      session.user.registerationId = token.registerationId;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
} satisfies NextAuthConfig;
