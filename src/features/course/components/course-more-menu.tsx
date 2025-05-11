"use client";

import { useConfirmDialog } from "@/components/confirm-dailog";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { isTeacher } from "@/features/utils/is-teacher";
import { coursePath } from "@/paths/paths";
import { Eye, Trash2, UserMinus, UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useActionState } from "react";
import { courseEnrollment } from "../actions/course-enrollment";
import { deleteCourse } from "../actions/delete-course";
import { Course } from "../types";
import { isCourseOwner } from "../utils/is-course-owner";

type QuizMoreMenuProps = {
  course: Course;
  trigger: ReactNode;
  isEnrolled: boolean;
};

export const CourseCardMoreMenu = ({ course, trigger, isEnrolled }: QuizMoreMenuProps) => {
  const { data: session } = useSession();
  const [formState, enrollmentAction] = useActionState(courseEnrollment.bind(null, course._id), Empty_Action_State);

  const isOwner = isCourseOwner(course.createdBy._id, session?.user.id);
  console.log(formState);

  const [deleteButton, dialog] = useConfirmDialog({
    action: deleteCourse.bind(null, course._id),
    trigger: (
      <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={(e) => e.stopPropagation()}>
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  const viewDetailsButton = (
    <Link href={coursePath(course._id)}>
      <DropdownMenuItem>
        <Eye className="mr-2 h-4 w-4" />
        <span>View Details</span>
      </DropdownMenuItem>
    </Link>
  );

  const enrollUnEnrollButton = (
    <form action={enrollmentAction}>
      <button type="submit" className="bg-transparent w-full">
        <DropdownMenuItem>
          {isEnrolled ? (
            <>
              <UserMinus className="mr-2 h-4 w-4" />
              Unenroll
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Enroll
            </>
          )}
        </DropdownMenuItem>
      </button>
    </form>
  );
  return (
    <>
      {dialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="right">
          {isOwner && isTeacher(session?.user.role) ? (
            <>
              {viewDetailsButton}
              <DropdownMenuSeparator />
              {deleteButton}
            </>
          ) : (
            <>
              {enrollUnEnrollButton}
              {viewDetailsButton}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
