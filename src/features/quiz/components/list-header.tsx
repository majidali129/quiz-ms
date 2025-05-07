import { ReactElement } from "react";
import { DialogShell } from "./dialog-shell";

type ListHeaderProps = {
  heading: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogTriggerText: string;
  children: ReactElement<{ onClose?: () => void }>;
};

const ListHeader = ({ heading, dialogTitle, children, dialogDescription, dialogTriggerText }: ListHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl tracking-wide">{heading}</h2>
      <DialogShell title={dialogTitle} description={dialogDescription} triggerText={dialogTriggerText}>
        {children}
      </DialogShell>
    </div>
  );
};
export { ListHeader };
