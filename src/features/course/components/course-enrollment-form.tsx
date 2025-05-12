"use client";

import { Form } from "@/components/form/form";
import { FormItem } from "@/components/form/form-item";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { courseEnrollmentByTeacher } from "../actions/course-enrollment-by-teacher";

type CourseEnrollmentFormProps = {
  onClose?: () => void;
  courseId: string;
};

const CourseEnrollmentForm = ({ onClose, courseId }: CourseEnrollmentFormProps) => {
  const [formState, enrollmentAction] = useActionState(courseEnrollmentByTeacher.bind(null, courseId), Empty_Action_State);
  return (
    <Form actionState={formState} onSuccess={onClose} action={enrollmentAction}>
      <div className="flex flex-col gap-4">
        <FormItem name="studentEmail" label="Student Email" type="email" required={true} placeholder="user@gmai.com" formState={formState} />
        <div className="py-2 flex justify-end">
          <SubmitButton label="Enroll now" className="w-fit" />
        </div>
      </div>
    </Form>
  );
};
export default CourseEnrollmentForm;
