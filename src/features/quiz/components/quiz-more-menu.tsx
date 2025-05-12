"use client";

import { useConfirmDialog } from "@/components/confirm-dailog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { isTeacher } from "@/features/utils/is-teacher";
import { quizPath } from "@/paths/paths";
import { ROLE } from "@/types/index";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { deleteQuiz } from "../actions/delete-quiz";
import { Quiz } from "../types";

type QuizMoreMenuProps = {
  quiz: Quiz;
  trigger: ReactNode;
  role: ROLE;
};

export const QuizCardMoreMenu = ({ quiz, trigger, role }: QuizMoreMenuProps) => {
  const [deleteButton, dialog] = useConfirmDialog({
    action: deleteQuiz.bind(null, quiz._id),
    trigger: (
      <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={(e) => e.stopPropagation()}>
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  // const pauseResumeButton = (
  //   <DropdownMenuItem>
  //     <Play className="mr-2 h-4 w-4" />
  //     <span>{quiz.completionStatus === "in-progress" ? "Resume Quiz" : "Start Quiz"}</span>
  //   </DropdownMenuItem>
  // );

  const viewDetailsButton = (
    <Link href={quizPath(quiz._id)} prefetch>
      <DropdownMenuItem>
        <Eye className="mr-2 h-4 w-4" />
        <span>View Details</span>
      </DropdownMenuItem>
    </Link>
  );
  return (
    <>
      {dialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="right">
          {isTeacher(role) ? (
            <>
              {viewDetailsButton}
              <DropdownMenuSeparator />
              {deleteButton}
            </>
          ) : (
            <>
              {/* {pauseResumeButton} */}
              {viewDetailsButton}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
