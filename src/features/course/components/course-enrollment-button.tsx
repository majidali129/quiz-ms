"use client";

import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserMinus, UserPlus } from "lucide-react";
import { useActionState } from "react";
import { courseEnrollment } from "../actions/course-enrollment";

type CourseEnrollmentButtonProps = {
  isEnrolled: boolean;
  courseId: string;
  variant?: "ghost" | "outline" | "default" | "destructive" | "secondary";
  className?: string;
  size?: "sm" | "lg" | "icon" | "default";
};

export const CourseEnrollmentButton = ({ isEnrolled, courseId, className, variant = "default", size = "default" }: CourseEnrollmentButtonProps) => {
  const [formState, enrollmentAction] = useActionState(courseEnrollment.bind(null, courseId), Empty_Action_State);
  console.log(formState);
  return (
    <form action={enrollmentAction}>
      <Button size={size} variant={variant} type="submit" className={cn("w-full flex items-center", className)}>
        {isEnrolled ? (
          <>
            <UserMinus className="mr-1 h-4 w-4" />
            Unenroll
          </>
        ) : (
          <>
            <UserPlus className="mr-1 h-4 w-4" />
            Enroll
          </>
        )}
      </Button>
    </form>
  );
};
