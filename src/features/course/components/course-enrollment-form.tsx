"use client";

import { Form } from "@/components/form/form";
import { FormItem } from "@/components/form/form-item";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import Link from "next/link";
import { useActionState } from "react";
import { courseEnrollmentByTeacher } from "../actions/course-enrollment-by-teacher";
import { Course } from "../types";

type CourseEnrollmentFormProps = {
  onClose?: () => void;
  course: Course;
};

const CourseEnrollmentForm = ({ onClose, course }: CourseEnrollmentFormProps) => {
  const [formState, enrollmentAction] = useActionState(courseEnrollmentByTeacher.bind(null, course._id), Empty_Action_State);
  return (
    <Form actionState={formState} onSuccess={onClose} action={enrollmentAction}>
      <div className="flex flex-col gap-4">
        <FormItem name="fullName" label="FullName" type="text" required={true} placeholder="John doe" formState={formState} />
        <FormItem name="userName" label="Username" type="text" required={true} placeholder="majid129" formState={formState} />
        <SubmitButton label="Enroll now" />
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </Form>
  );
};
export default CourseEnrollmentForm;
