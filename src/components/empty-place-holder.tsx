import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface EmptyCoursesProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  userRole?: "student" | "instructor" | "admin";
}

export const EmptyPlayceholder = ({ title = "No Courses Found", description = "There are no courses available at the moment." }: EmptyCoursesProps) => {
  // Default action based on user role

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center text-center p-6 py-16">
        <div className="rounded-full bg-slate-100 p-6 mb-6">
          <BookOpen className="h-12 w-12 text-slate-400" />
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-500 mb-6 max-w-md">{description}</p>
      </CardContent>
    </Card>
  );
};
