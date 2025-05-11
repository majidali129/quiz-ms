"use client";

import { Form } from "@/components/form/form";
import { FormItem } from "@/components/form/form-item";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Course } from "@/features/course/types";
import { Trash2 } from "lucide-react";
import type React from "react";
import { use, useActionState, useState } from "react";
import { createQuize } from "../actions/create-quiz";
import { Quiz } from "../types";

type CreateQuizFormProps = {
  open?: boolean;
  onClose?: () => void;
  coursesPromise: Promise<Course[]>;
  quiz?: Quiz;
};

export const CreateQuizForm = ({ onClose, coursesPromise, quiz }: CreateQuizFormProps) => {
  const courses = use(coursesPromise);
  const [formState, action] = useActionState(createQuize.bind(null, quiz?._id), Empty_Action_State);
  const [quizType, setQuizType] = useState("Objective");
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState(
    quiz?.questions ?? [
      {
        questionText: "",
        options: ["", "", "", ""],
        correctOption: 0,
      },
    ]
  );

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      {
        questionText: "New Question",
        options: ["", "", "", ""],
        correctOption: 0,
      },
      ...questions,
    ]);
  };

  // Remove a question
  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  // Update question text
  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = text;
    setQuestions(updatedQuestions);
  };

  // Update option text
  const updateOptionText = (questionIndex: number, optionIndex: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  // Set correct option
  const setCorrectOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = optionIndex;
    setQuestions(updatedQuestions);
  };

  const course = courses.find((course) => course._id === quiz?.course._id);

  console.log(course);
  return (
    <Card className="w-full ">
      <Form action={action} actionState={formState} onSuccess={onClose}>
        <CardContent className="space-y-6">
          {/* Basic Quiz Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem name="title" label="Quiz Title" type="text" required={true} placeholder="Enter quiz title" formState={formState} editValue={quiz?.title} />

            <div className="space-y-2  ">
              <Label htmlFor="course">Course</Label>
              <Select name="course" defaultValue={quiz?.course?._id}>
                <SelectTrigger className="w-full h-auto py-2.5">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <input type="hidden" name="questions" value={JSON.stringify(questions)} />
          <FormItem name="description" label="Description (Optional)" placeholder="Enter quiz description" required={true} formState={formState} textArea editValue={quiz?.description} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quizType">Quiz Type</Label>
              <Select name="quizType" value={quiz?.quizType ?? quizType} onValueChange={setQuizType}>
                <SelectTrigger className="w-full h-auto py-2.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Objective">Objective</SelectItem>
                  <SelectItem value="Subjective">Subjective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FormItem name="duration" label="Duration (minutes)" type="number" min="1" max="180" required={true} editValue={quiz?.settings.duration.toString()} formState={formState} />
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select name="difficulty" value={quiz?.difficulty ?? difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-full h-auto py-2.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormItem name="maxAttempts" label="Max Attempts" type="number" min="1" max="10" required={true} formState={formState} editValue={quiz?.settings.maxAttempts.toString()} />
            <FormItem name="passingScore" label="Passing Score (%)" type="number" min="1" max="100" required={true} formState={formState} editValue={quiz?.settings.passingScore.toString()} />
            <FormItem name="startDate" label="Start Date" type="date" required={true} formState={formState} editValue={quiz?.schedule.startDate} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormItem name="startTime" label="Start Time" type="time" required={true} formState={formState} editValue={quiz?.schedule.startTime} />
            <FormItem name="endDate" label="End Date" type="date" required={true} formState={formState} editValue={quiz?.schedule.endDate} />
          </div>

          {/* Questions Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-medium">Questions</Label>
              <Button type="button" onClick={addQuestion} variant="outline">
                Add Question
              </Button>
            </div>

            {questions.map((question, questionIndex) => (
              <Card key={questionIndex} className="mt-4">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <Input placeholder="Enter question" value={question.questionText} onChange={(e) => updateQuestionText(questionIndex, e.target.value)} className="flex-1 mr-2" />
                    {questions.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeQuestion(questionIndex)} className="text-red-500 hover:text-red-700 hover:bg-red-100">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    )}
                  </div>

                  <RadioGroup value={question.correctOption.toString()} onValueChange={(value) => setCorrectOption(questionIndex, Number.parseInt(value))}>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={optionIndex.toString()} id={`q${questionIndex}-o${optionIndex}`} />
                        <Input placeholder={`Option ${optionIndex + 1}`} value={option} onChange={(e) => updateOptionText(questionIndex, optionIndex, e.target.value)} className="flex-1" />
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 py-2">
          <Button onClick={onClose} type="button" variant="outline">
            Cancel
          </Button>
          <SubmitButton label={quiz ? "Save Quiz" : "Create Quiz"} className="w-fit" />
        </CardFooter>
      </Form>
    </Card>
  );
};
