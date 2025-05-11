"use client";

import { useConfirmDialog } from "@/components/confirm-dailog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteCourse } from "../actions/delete-course";

export const CourseDeleteButton = ({ courseId }: { courseId: string }) => {
  const [deleteButton, dialog] = useConfirmDialog({
    action: deleteCourse.bind(null, courseId),
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
