import { cookies } from "next/headers";
type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
};
export const setCookieByKey = async (key: string, value: string, options?: CookieOptions) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, options || { httpOnly: true, secure: true });
  return true;
};

export const getCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};

export const deleteCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
  return true;
};
