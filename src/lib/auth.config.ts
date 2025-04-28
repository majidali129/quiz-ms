import { User } from "@/models/user-model";
import { signInSchema } from "@/schemas/sign-in-schema";
import type { NextAuthConfig } from "next-auth";
import { default as Credentials } from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectDB } from "./connect-db";

export const authConfig = {
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
        const formData = new FormData();
        formData.append("email", credentials?.email as string);
        formData.append("password", credentials?.password as string);
        formData.append("role", credentials?.role as string);
        const data = await signInSchema.safeParse(Object.fromEntries(formData));

        user = await User.findOne({ email: data?.data?.email }).lean();

        // if (!user || !user.password) {
        //   return null;
        // }

        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (passwordMatch) {
        //   return user;
        // }

        // return { ...user, id: user._id.toString(), role: cookieStore.get("user-role")?.value };
        // return {
        //   id: user._id.toString(),
        //   userName: user.userName,
        //   fullName: user.fullName,
        //   email: user.email,
        //   role: user.role,
        //   picture: user.picture,
        // };
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async signIn({ user, account, profile }) {
      await connectDB();

      try {
        if (account?.provider === "google") {
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            user.userName = existingUser.userName;
            user.role = existingUser.role;
            user.id = existingUser._id.toString();
            user.fullName = `${profile?.given_name} ${profile?.family_name}`;
            user.registerationId = existingUser.registerationId as string;
            return true;
          } else {
            const newUser = await User.create({
              userName: user.email?.split("@")[0],
              fullName: `${profile?.given_name} ${profile?.family_name}`,
              email: user.email,
              picture: profile?.picture,
              provider: account.provider,
              providerId: account.providerAccountId,
              role: user?.role,
            });

            user.picture = newUser?.picture as string;
            user.userName = newUser.userName;
            user.role = newUser?.role;
            user.id = newUser._id.toString();
            user.fullName = newUser.fullName;
            user.registerationId = newUser?.registerationId;
            return true;
          }
        }

        return true;
      } catch (error) {
        console.log("SignIn Error: ", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || null;
        token.picture = user.picture || null;
        token.id = user.id || null;
        token.fullName = `${user.given_name} ${user.family_name}` || null;
        token.registerationId = user.registerationId || null;
      }

      return token;
    },

    session({ session, token }) {
      session.user.userName = token.email?.split("@")[0];
      session.user.id = token.id;
      session.user.fullName = token.fullName;
      session.user.role = token.role;
      session.user.picture = token.picture;
      session.user.registerationId = token.registerationId;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
} satisfies NextAuthConfig;
