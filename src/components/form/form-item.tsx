import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import FieldError from "./field-error";
import { ActionState } from "./utils/to-action-state";

type FormItemProps = {
  textArea?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: "email" | "password" | "text" | "number" | "date" | "time" | "file" | "hidden" | "submit" | "reset";
  className?: string;
  min?: string;
  max?: string;
  rows?: number;
  isLogin?: boolean;
  formState: ActionState;
};

const FormItem = ({ label, name, placeholder, min, max, rows, required, type = "text", textArea = false, className, isLogin = false, formState }: FormItemProps) => {
  const renderLabel =
    type === "password" ? (
      <div className="flex items-center">
        <Label htmlFor="password">Password</Label>
        {isLogin && (
          <Link href="/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </Link>
        )}
      </div>
    ) : (
      <Label htmlFor={name}>{label}</Label>
    );
  return (
    <div className={cn("grid gap-1.5", className)}>
      {renderLabel}
      {textArea ? (
        <Textarea name={name} required={required} rows={rows} defaultValue={formState?.payload?.get(name) as string} placeholder={placeholder} />
      ) : (
        <Input autoComplete="off" min={min} max={max} id={name} name={name} type={type} placeholder={placeholder} required={required} defaultValue={formState?.payload?.get(name) as string} />
      )}
      {/* {formState?.fieldErrors && <FieldError name={name} actionState={formState} />} */}
      <FieldError name={name} actionState={formState} />
      {}
    </div>
  );
};
export { FormItem };
