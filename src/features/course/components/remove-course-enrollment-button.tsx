"use client";

import { useConfirmDialog } from "@/components/confirm-dailog";
import { Button } from "@/components/ui/button";
import { courseEnrollmentRemoveByTeacher } from "../actions/course-enrollment-remove-by-teacher";

export const RemoveCourseEnrollmentButton = ({ studentId, courseId }: { studentId: string; courseId: string }) => {
  const [deleteButton, dialog] = useConfirmDialog({
    action: courseEnrollmentRemoveByTeacher.bind(null, studentId, courseId),
    trigger: (
      <Button variant="ghost" size="sm" className="text-red-600">
        Remove
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
