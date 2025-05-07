declare module "next-auth" {
  interface User {
    id: string;
    userName: string;
    given_name: string;
    family_name: string;
    picture: string;
    role?: string;
    registerationId?: string;
  }
  interface Session {
    user: {
      userName: string;
      id: string;
      picture: string;
      role: string;
    } & defaultSession["user"];
  }
}

export const authConfig = {
  // your config
} satisfies NextAuthConfig;
