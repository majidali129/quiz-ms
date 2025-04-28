"use client";

import { Form } from "@/components/form/form";
import { FormItem } from "@/components/form/form-item";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import type React from "react";
import { useActionState, useState } from "react";
import { createQuize } from "../actions/create-quiz";

const courses = [
  { id: "1", name: "Web Development" },
  { id: "2", name: "Mathematics" },
  { id: "3", name: "Science" },
  { id: "4", name: "History" },
  { id: "5", name: "English" },
];

type CreateQuizFormProps = {
  open?: boolean;
  onClose?: () => void;
};

export const CreateQuizForm = ({ onClose }: CreateQuizFormProps) => {
  const [formState, action] = useActionState(createQuize, Empty_Action_State);
  const [quizType, setQuizType] = useState("Objective");
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctOption: 0,
    },
  ]);

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

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="">Create New Quiz</CardTitle>
      </CardHeader>
      <Form action={action} actionState={formState} onSuccess={onClose}>
        <CardContent className="space-y-6">
          {/* Basic Quiz Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem name="title" label="Quiz Title" type="text" required={true} placeholder="Enter quiz title" formState={formState} />

            <div className="space-y-2  ">
              <Label htmlFor="course">Course</Label>
              <Select name="course" defaultValue="">
                <SelectTrigger className="w-full h-auto py-2.5">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <input type="hidden" name="questions" value={JSON.stringify(questions)} />
          <FormItem name="description" label="Description (Optional)" placeholder="Enter quiz description" required={true} formState={formState} textArea />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quizType">Quiz Type</Label>
              <Select name="quizType" value={quizType} onValueChange={setQuizType}>
                <SelectTrigger className="w-full h-auto py-2.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Objective">Objective</SelectItem>
                  <SelectItem value="Subjective">Subjective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FormItem name="quizDuration" label="Duration (minutes)" type="number" min="1" max="180" required={true} formState={formState} />
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select name="difficulty" value={difficulty} onValueChange={setDifficulty}>
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
            <FormItem name="maxAttempts" label="Max Attempts" type="number" min="1" max="10" required={true} formState={formState} />
            <FormItem name="passingScore" label="Passing Score (%)" type="number" min="1" max="100" required={true} formState={formState} />
            <FormItem name="startDate" label="Start Date" type="date" required={true} formState={formState} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormItem name="startTime" label="Start Time" type="time" required={true} formState={formState} />
          </div>

          {/* Questions Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-medium">Questions</Label>
              <Button type="button" onClick={addQuestion} className="bg-indigo-600 hover:bg-indigo-700">
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
          <SubmitButton label="Create Quiz" className="w-fit" />
        </CardFooter>
      </Form>
    </Card>
  );
};

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { CalendarIcon, ChevronLeft, ChevronRight, Loader2, Plus, Save, Trash2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
// import { cn } from "@/lib/utils";

// const courses = [
//   { id: "1", name: "Introduction to Web Development" },
//   { id: "2", name: "Advanced JavaScript" },
//   { id: "3", name: "React Fundamentals" },
//   { id: "4", name: "Node.js and Express" },
//   { id: "5", name: "MongoDB Essentials" },
// ];

// // Form schemas
// const basicInfoSchema = z.object({
//   quizType: z.enum(["Objective", "Subjective"]),
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   description: z.string().optional(),
//   course: z.string().min(1, "Please select a course"),
// });

// const constraintsSchema = z.object({
//   duration: z.coerce.number().min(1).max(180),
//   maxAttempts: z.coerce.number().min(1).max(10),
//   passingScore: z.coerce.number().min(1).max(100),
//   isActive: z.boolean(),
//   shuffleQuestions: z.boolean(),
//   shuffleOptions: z.boolean(),
//   startDate: z.date(),
//   startTime: z.string().min(1, "Start time is required"),
// });

// const questionSchema = z.object({
//   questionText: z.string().min(5, "Question text must be at least 5 characters"),
//   options: z.array(z.string().min(1, "Option cannot be empty")).min(2).max(6),
//   correctOption: z.number(),
// });

// const quizSchema = z.object({
//   basicInfo: basicInfoSchema,
//   constraints: constraintsSchema,
//   questions: z.array(questionSchema).min(1, "At least one question is required"),
// });

// type QuizFormValues = z.infer<typeof quizSchema>;

// export default function CreateQuizForm() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Initialize form with default values
//   const form = useForm<QuizFormValues>({
//     resolver: zodResolver(quizSchema),
//     defaultValues: {
//       basicInfo: {
//         quizType: "Objective",
//         title: "",
//         description: "",
//         course: "",
//       },
//       constraints: {
//         duration: 30,
//         maxAttempts: 3,
//         passingScore: 50,
//         isActive: true,
//         shuffleQuestions: false,
//         shuffleOptions: false,
//         startDate: new Date(),
//         startTime: "09:00",
//       },
//       questions: [
//         {
//           questionText: "",
//           options: ["", ""],
//           correctOption: 0,
//         },
//       ],
//     },
//   });

//   const { control, watch, setValue, handleSubmit, formState } = form;
//   const { errors } = formState;

//   // Watch questions array to manage them
//   const questions = watch("questions");

//   // Add a new question
//   const addQuestion = () => {
//     const currentQuestions = form.getValues("questions");
//     setValue("questions", [
//       ...currentQuestions,
//       {
//         questionText: "",
//         options: ["", ""],
//         correctOption: 0,
//       },
//     ]);
//   };

//   // Remove a question
//   const removeQuestion = (index: number) => {
//     const currentQuestions = form.getValues("questions");
//     if (currentQuestions.length > 1) {
//       setValue(
//         "questions",
//         currentQuestions.filter((_, i) => i !== index)
//       );
//     }
//   };

//   // Add an option to a question
//   const addOption = (questionIndex: number) => {
//     const currentQuestions = form.getValues("questions");
//     const currentOptions = currentQuestions[questionIndex].options;

//     if (currentOptions.length < 6) {
//       const updatedQuestions = [...currentQuestions];
//       updatedQuestions[questionIndex].options = [...currentOptions, ""];
//       setValue("questions", updatedQuestions);
//     }
//   };

//   // Remove an option from a question
//   const removeOption = (questionIndex: number, optionIndex: number) => {
//     const currentQuestions = form.getValues("questions");
//     const currentOptions = currentQuestions[questionIndex].options;

//     if (currentOptions.length > 2) {
//       const updatedQuestions = [...currentQuestions];
//       updatedQuestions[questionIndex].options = currentOptions.filter((_, i) => i !== optionIndex);

//       // If we're removing the correct option, reset it to 0
//       if (updatedQuestions[questionIndex].correctOption === optionIndex) {
//         updatedQuestions[questionIndex].correctOption = 0;
//       } else if (updatedQuestions[questionIndex].correctOption > optionIndex) {
//         // If we're removing an option before the correct one, decrement the correct option index
//         updatedQuestions[questionIndex].correctOption--;
//       }

//       setValue("questions", updatedQuestions);
//     }
//   };

//   // Handle form submission
//   const onSubmit = async (data: QuizFormValues) => {
//     setIsSubmitting(true);

//     try {
//       // Transform the data to match your API expectations
//       const quizData = {
//         quizType: data.basicInfo.quizType,
//         title: data.basicInfo.title,
//         description: data.basicInfo.description,
//         course: data.basicInfo.course,
//         createdBy: "current-teacher-username", // This should come from auth context
//         questions: data.questions,
//         constraints: data.constraints,
//       };

//       console.log("Quiz data to submit:", quizData);

//       // Here you would make an API call to create the quiz
//       // await createQuiz(quizData)

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Redirect to quizzes page after successful creation
//       router.push("/quizzes");
//     } catch (error) {
//       console.error("Error creating quiz:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Navigation between steps
//   const nextStep = () => {
//     if (step < 3) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <div className="py-3">
//       {/* <div className="mb-8">
//         <h1 className="text-3xl font-bold text-foreground">Create New Quiz</h1>
//         <p className="text-zinc-500 dark:text-zinc-400 mt-2">Create a new quiz for your students</p>
//       </div> */}

//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div
//               className={cn(
//                 "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
//                 step >= 1 ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
//               )}
//             >
//               1
//             </div>
//             <span className={cn("text-sm font-medium", step >= 1 ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400")}>Basic Info</span>
//           </div>
//           <Separator className="flex-1 mx-4" />
//           <div className="flex items-center space-x-2">
//             <div
//               className={cn(
//                 "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
//                 step >= 2 ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
//               )}
//             >
//               2
//             </div>
//             <span className={cn("text-sm font-medium", step >= 2 ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400")}>Constraints</span>
//           </div>
//           <Separator className="flex-1 mx-4" />
//           <div className="flex items-center space-x-2">
//             <div
//               className={cn(
//                 "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
//                 step >= 3 ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
//               )}
//             >
//               3
//             </div>
//             <span className={cn("text-sm font-medium", step >= 3 ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400")}>Questions</span>
//           </div>
//         </div>
//       </div>

//       <Form {...form}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Step 1: Basic Info */}
//           {step === 1 && (
//             <Card className="border-zinc-200 dark:border-zinc-800">
//               <CardHeader>
//                 <CardTitle>Quiz Information</CardTitle>
//                 <CardDescription>Enter the basic details of your quiz</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <FormField
//                   control={control}
//                   name="basicInfo.quizType"
//                   render={({ field }) => (
//                     <FormItem className="space-y-3">
//                       <FormLabel>Quiz Type</FormLabel>
//                       <FormControl>
//                         <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="Objective" />
//                             </FormControl>
//                             <FormLabel className="font-normal">Objective (Multiple Choice)</FormLabel>
//                           </FormItem>
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="Subjective" />
//                             </FormControl>
//                             <FormLabel className="font-normal">Subjective (Written Answers)</FormLabel>
//                           </FormItem>
//                         </RadioGroup>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="basicInfo.title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Quiz Title</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter quiz title" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="basicInfo.description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description (Optional)</FormLabel>
//                       <FormControl>
//                         <Textarea placeholder="Enter a description for your quiz" className="resize-none" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={control}
//                   name="basicInfo.course"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Course</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a course" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {courses.map((course) => (
//                             <SelectItem key={course.id} value={course.id}>
//                               {course.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button type="button" onClick={nextStep}>
//                   Next
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </CardFooter>
//             </Card>
//           )}

//           {/* Step 2: Constraints */}
//           {step === 2 && (
//             <Card className="border-zinc-200 dark:border-zinc-800">
//               <CardHeader>
//                 <CardTitle>Quiz Constraints</CardTitle>
//                 <CardDescription>Set the rules and limitations for your quiz</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={control}
//                     name="constraints.duration"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Duration (minutes)</FormLabel>
//                         <FormControl>
//                           <Input type="number" min={1} max={180} {...field} />
//                         </FormControl>
//                         <FormDescription>Between 1 and 180 minutes</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={control}
//                     name="constraints.maxAttempts"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Maximum Attempts</FormLabel>
//                         <FormControl>
//                           <Input type="number" min={1} max={10} {...field} />
//                         </FormControl>
//                         <FormDescription>Between 1 and 10 attempts</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={control}
//                     name="constraints.passingScore"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Passing Score (%)</FormLabel>
//                         <FormControl>
//                           <Input type="number" min={1} max={100} {...field} />
//                         </FormControl>
//                         <FormDescription>Between 1% and 100%</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={control}
//                     name="constraints.startTime"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Start Time</FormLabel>
//                         <FormControl>
//                           <Input type="time" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={control}
//                     name="constraints.startDate"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col">
//                         <FormLabel>Start Date</FormLabel>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <FormControl>
//                               <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
//                                 {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                               </Button>
//                             </FormControl>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
//                           </PopoverContent>
//                         </Popover>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <FormField
//                     control={control}
//                     name="constraints.isActive"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Active Quiz</FormLabel>
//                           <FormDescription>Make this quiz available to students immediately</FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={control}
//                     name="constraints.shuffleQuestions"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Shuffle Questions</FormLabel>
//                           <FormDescription>Randomize the order of questions for each student</FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={control}
//                     name="constraints.shuffleOptions"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Shuffle Options</FormLabel>
//                           <FormDescription>Randomize the order of answer options for each question</FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button type="button" variant="outline" onClick={prevStep}>
//                   <ChevronLeft className="mr-2 h-4 w-4" />
//                   Previous
//                 </Button>
//                 <Button type="button" onClick={nextStep}>
//                   Next
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </CardFooter>
//             </Card>
//           )}

//           {/* Step 3: Questions */}
//           {step === 3 && (
//             <div className="space-y-6">
//               <Card className="border-zinc-200 dark:border-zinc-800">
//                 <CardHeader>
//                   <CardTitle>Quiz Questions</CardTitle>
//                   <CardDescription>Add questions to your quiz</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="mb-4">
//                     <Button type="button" onClick={addQuestion} variant="outline" className="w-full">
//                       <Plus className="mr-2 h-4 w-4" />
//                       Add New Question
//                     </Button>
//                   </div>

//                   {questions.map((question, questionIndex) => (
//                     <Card key={questionIndex} className="mb-6 border-zinc-200 dark:border-zinc-800">
//                       <CardHeader className="pb-3">
//                         <div className="flex items-center justify-between">
//                           <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
//                           {questions.length > 1 && (
//                             <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(questionIndex)} className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20">
//                               <Trash2 className="h-4 w-4" />
//                               <span className="sr-only">Remove question</span>
//                             </Button>
//                           )}
//                         </div>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <FormField
//                           control={control}
//                           name={`questions.${questionIndex}.questionText`}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Question Text</FormLabel>
//                               <FormControl>
//                                 <Textarea placeholder="Enter your question" className="resize-none" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />

//                         <div className="space-y-4">
//                           <div className="flex items-center justify-between">
//                             <FormLabel>Answer Options</FormLabel>
//                             {question.options.length < 6 && (
//                               <Button type="button" variant="outline" size="sm" onClick={() => addOption(questionIndex)}>
//                                 <Plus className="mr-1 h-3 w-3" />
//                                 Add Option
//                               </Button>
//                             )}
//                           </div>

//                           {question.options.map((option, optionIndex) => (
//                             <div key={optionIndex} className="flex items-start space-x-2">
//                               <FormField
//                                 control={control}
//                                 name={`questions.${questionIndex}.correctOption`}
//                                 render={({ field }) => (
//                                   <FormItem className="flex items-center space-x-3 space-y-0 mt-2">
//                                     <FormControl>
//                                       <input type="radio" className="h-4 w-4 text-zinc-900 dark:text-zinc-50 focus:ring-zinc-500" checked={field.value === optionIndex} onChange={() => field.onChange(optionIndex)} />
//                                     </FormControl>
//                                   </FormItem>
//                                 )}
//                               />
//                               <div className="flex-1">
//                                 <FormField
//                                   control={control}
//                                   name={`questions.${questionIndex}.options.${optionIndex}`}
//                                   render={({ field }) => (
//                                     <FormItem>
//                                       <FormControl>
//                                         <Input placeholder={`Option ${optionIndex + 1}`} {...field} />
//                                       </FormControl>
//                                       <FormMessage />
//                                     </FormItem>
//                                   )}
//                                 />
//                               </div>
//                               {question.options.length > 2 && (
//                                 <Button type="button" variant="ghost" size="sm" onClick={() => removeOption(questionIndex, optionIndex)} className="mt-1 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20">
//                                   <Trash2 className="h-4 w-4" />
//                                   <span className="sr-only">Remove option</span>
//                                 </Button>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                   <Button type="button" variant="outline" onClick={prevStep}>
//                     <ChevronLeft className="mr-2 h-4 w-4" />
//                     Previous
//                   </Button>
//                   <Button type="submit" disabled={isSubmitting}>
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Creating Quiz...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="mr-2 h-4 w-4" />
//                         Create Quiz
//                       </>
//                     )}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </div>
//           )}
//         </form>
//       </Form>
//     </div>
//   );
// }
