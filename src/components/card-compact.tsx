import { cn } from "@/lib/utils";
import { ReactElement, ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type CardCompactProps = {
  title: string | ReactElement;
  description?: string;
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export const CardCompact = ({ title, description, content, footer, className }: CardCompactProps) => {
  return (
    <Card className={cn("max-w-[370px] flex self-center w-full py-5", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter className="justify-between">{footer}</CardFooter>}
    </Card>
  );
};
