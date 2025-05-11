"use client";

import { useConfirmDialog } from "@/components/confirm-dailog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteQuiz } from "../actions/delete-quiz";

export const QuizDeleteButton = ({ quizId }: { quizId: string }) => {
  const [deleteButton, dialog] = useConfirmDialog({
    action: deleteQuiz.bind(null, quizId),
    trigger: (
      <Button variant="destructive" size="sm" className="gap-1">
        <Trash2 className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Delete</span>
      </Button>
    ),
  });
  return (
    <>
      {deleteButton}
      {dialog}
    </>
  );
};
