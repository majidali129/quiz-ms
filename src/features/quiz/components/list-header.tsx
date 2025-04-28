import { CreateQuizForm } from "./create-quiz-form";
import { DialogShell } from "./dialog-shell";

type ListHeaderProps = {
  heading: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogTriggerText: string;
};

const ListHeader = ({ heading, dialogTitle, dialogDescription, dialogTriggerText }: ListHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl tracking-wide">{heading}</h2>
      <DialogShell title={dialogTitle} description={dialogDescription} triggerText={dialogTriggerText}>
        <CreateQuizForm />
      </DialogShell>
    </div>
  );
};
export { ListHeader };
