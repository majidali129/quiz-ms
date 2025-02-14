import { IApiResponse } from "@/types/apiResponse";
import { NextResponse } from "next/server";

export const apiResponse = ({
  status = 200,
  message,
  success = true,
  data,
  error,
}: IApiResponse) => {
  if (error) {
    return NextResponse.json(
      { message, success, error, data: null },
      { status }
    );
  }

  return NextResponse.json({ success, message, data }, { status });
};
