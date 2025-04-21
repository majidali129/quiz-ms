import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  return (
    <>
      <span className="text-sm text-red-500">{actionState.fieldErrors[name]}</span>
    </>
  );
};
export default FieldError;
