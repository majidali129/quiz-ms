import { ZodError } from "zod";

export type ActionState<T = unknown> = { status?: "SUCCESS" | "ERROR"; message: string; fieldErrors: Record<string, string[] | undefined>; payload?: FormData; timestamp: number; data?: T };

export const Empty_Action_State: ActionState = {
  message: "",
  fieldErrors: {},
  payload: undefined,
  timestamp: Date.now(),
};
export const fromErrorToActionState = (error: unknown, formData: FormData): ActionState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: undefined,
      timestamp: Date.now(),
    };
  } else
    return {
      status: "ERROR",
      message: "Unknown error occured",
      fieldErrors: {},
      payload: undefined,
      timestamp: Date.now(),
    };
};

export const toActionState = (status: ActionState["status"], message: string, payload?: FormData, data?: unknown): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
    payload,
    data,
  };
};
