import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = { actionState: ActionState };
type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export const useActionFeedback = (actionState: ActionState, options: UseActionFeedbackOptions) => {
  const prevTimestamp = useRef(actionState?.timestamp);

  const isUpdated = actionState?.timestamp !== prevTimestamp.current;
  useEffect(() => {
    if (!isUpdated) return;
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState?.timestamp;
  }, [actionState, options, isUpdated]);
};
