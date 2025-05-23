"use client";

import type React from "react";

import { Form } from "@/components/form/form";
import { FormItem } from "@/components/form/form-item";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useActionState, useState } from "react";
import { createCourse } from "../actions/create-course";
import { Course } from "../types";

interface CreateCourseFormProps {
  onClose?: () => void;
  course?: Course;
}

export default function CreateCourseForm({ onClose, course }: CreateCourseFormProps) {
  const [formState, formAction] = useActionState(createCourse.bind(null, course?._id), Empty_Action_State);
  const [requireApproval, setRequireApproval] = useState(true);

  const handleRequireApproval = () => {
    setRequireApproval((prevApproval) => !prevApproval);
  };

  console.log(requireApproval, course);

  return (
    <Card>
      <Form action={formAction} actionState={formState} onSuccess={onClose}>
        <CardContent className="space-y-4">
          <FormItem name="title" label="Course Title" type="text" placeholder="e.g., Introduction to Computer Science" formState={formState} editValue={course?.title} />
          <FormItem name="description" label="Description" placeholder="Provide a brief description of the course" formState={formState} textArea rows={3} editValue={course?.description} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem name="code" label=" Course Code" placeholder="e.g., CS101" formState={formState} editValue={course?.code} />
            <input type="hidden" name="requireApproval" value={String(requireApproval)} />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="requireApproval">Require Approval</Label>
                <p className="text-sm text-muted-foreground">Students will need your approval to join</p>{" "}
              </div>
              <Switch id="requireApproval" checked={requireApproval} onCheckedChange={handleRequireApproval} />{" "}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem name="category" label="Category" placeholder="e.g web design" formState={formState} editValue={course?.category} />
            <FormItem name="price" label="Price" type="number" formState={formState} editValue={course?.price.toString()} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem name="duration" label="Duration (Hours) " type="number" placeholder="e.g web design" formState={formState} editValue={course?.duration.toString()} />
            <div className="space-y-2">
              <Label htmlFor="level">Course Level</Label>
              <Select name="level" defaultValue={course?.level}>
                <SelectTrigger id="level" className="w-full h-auto py-2.5">
                  <SelectValue defaultValue="beginner" placeholder="i.e beginner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 py-2">
          <Button onClick={onClose} type="button" variant="outline">
            Cancel
          </Button>
          <SubmitButton label={course ? "Save Course" : "Create Course"} className="w-fit" />
        </CardFooter>
      </Form>
    </Card>
  );
}
