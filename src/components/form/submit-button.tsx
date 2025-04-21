"use client";

import clsx from "clsx";
import { LucideLoader } from "lucide-react";
import { cloneElement, ReactElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  action?: () => void;
  label?: string;
  className?: string;
  icon?: ReactElement<{ className: string }>;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

const SubmitButton = ({ label, action, className, icon, variant = "default", size = "default" }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button onClick={action} type="submit" className={`w-full ${className}`} variant={variant} size={size} disabled={pending}>
      {pending && (
        <LucideLoader
          className={clsx("w-4 h-4 animate-spin", {
            "mr-2": !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? <span>{cloneElement(icon, { className: "w-4 h-4" })}</span> : null}
    </Button>
  );
};

export default SubmitButton;
