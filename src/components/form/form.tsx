import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  children: React.ReactNode;
  actionState: ActionState;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
  className?: string;
};
export const Form = ({ action, children, className, actionState, onSuccess, onError }: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) toast.success(actionState.message);
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) toast.error(actionState.message);
      onError?.(actionState);
    },
  });
  return (
    <form action={action} className={cn("flex flex-col gap-y-2", className)}>
      {children}
    </form>
  );
};
