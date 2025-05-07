"use client";

import { selectRole } from "@/actions/set-role";
import FieldError from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ClipboardCheck, PenTool } from "lucide-react";
import { useActionState, useState } from "react";

export const ChooseRoleForm = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formState, formAction] = useActionState(selectRole, Empty_Action_State);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Choose your role to get started</h1>
          <p className="text-gray-500 max-w-md mx-auto">Tell us who are you to personalize your experience with our platform.</p>
        </div>

        <Form action={formAction} actionState={formState}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teacher Role Card */}
            <div className="relative">
              <input type="radio" id="teacher" name="role" value="teacher" className="peer sr-only" checked={selectedRole === "teacher"} onChange={() => setSelectedRole("teacher")} />
              <label htmlFor="teacher">
                <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === "teacher" ? "ring-2 ring-primary" : ""} h-full`}>
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <PenTool className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Quiz Creator</CardTitle>
                    <CardDescription>Create and manage quizzes, monitor student performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <span>Create custom quizzes with various question types</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <span>Set time limits, scoring rules, and difficulty levels</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <span>View detailed analytics on student performance</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <span>Export results and generate performance reports</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </label>
            </div>

            {/* Student Role Card */}
            <div className="relative">
              <input type="radio" id="student" name="role" value="student" className="peer sr-only" checked={selectedRole === "student"} onChange={() => setSelectedRole("student")} />
              <label htmlFor="student">
                <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === "student" ? "ring-2 ring-primary" : ""} h-full`}>
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <ClipboardCheck className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Quiz Taker</CardTitle>
                    <CardDescription>Take quizzes, view your scores, and track your progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <span>Access assigned quizzes from your dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <span>Take quizzes with real-time feedback and scoring</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <span>Review your answers and see correct solutions</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <span>Track your progress and performance over time</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </label>
            </div>
          </div>
          <div className=" py-2 text-center">
            <FieldError actionState={formState} name="role" />
          </div>

          <div className="mt-8 flex justify-center">
            <Button type="submit" size="lg">
              Continue as {selectedRole === "teacher" ? "Teacher" : selectedRole === "student" ? "Student" : "..."}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
    // <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    //   <div className="w-full max-w-4xl">
    //     <div className="text-center mb-8">
    //       <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Choose your role</h1>
    //       <p className="text-gray-500 max-w-md mx-auto">Select how you'll be using our quiz management system</p>
    //     </div>

    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       {/* Teacher Role Card */}
    //       <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === "teacher" ? "ring-2 ring-primary" : ""}`} onClick={() => setSelectedRole("teacher")}>
    //         <CardHeader className="pb-2">
    //           <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
    //             <PenTool className="h-6 w-6 text-primary" />
    //           </div>
    //           <CardTitle>Quiz Creator</CardTitle>
    //           <CardDescription>Create and manage quizzes, monitor student performance</CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <ul className="space-y-2 text-sm">
    //             <li className="flex items-start">
    //               <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
    //               <span>Create custom quizzes with various question types</span>
    //             </li>
    //             <li className="flex items-start">
    //               <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
    //               <span>Set time limits, scoring rules, and difficulty levels</span>
    //             </li>
    //             <li className="flex items-start">
    //               <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
    //               <span>View detailed analytics on student performance</span>
    //             </li>
    //             <li className="flex items-start">
    //               <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
    //               <span>Export results and generate performance reports</span>
    //             </li>
    //           </ul>
    //         </CardContent>
    //       </Card>

    //       {/* Student Role Card */}
    //       <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === "student" ? "ring-2 ring-primary" : ""}`} onClick={() => setSelectedRole("student")}>
    //         <CardHeader className="pb-2">
    //           <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
    //             <ClipboardCheck className="h-6 w-6 text-primary" />
    //           </div>
    //           <CardTitle>Quiz Taker</CardTitle>
    //           <CardDescription>Take quizzes, view your scores, and track your progress</CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <ul className="space-y-2 text-sm">
    //             <li className="flex items-start">
    //               <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
    //               <span>Access assigned quizzes from your dashboard</span>
    //             </li>
    //             <li className="flex items-start">
    //               <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
    //               <span>Take quizzes with real-time feedback and scoring</span>
    //             </li>
    //             <li className="flex items-start">
    //               <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
    //               <span>Review your answers and see correct solutions</span>
    //             </li>
    //             <li className="flex items-start">
    //               <ChevronRight className="h-4 w-4 mr-2 text-primary mt-0.5" />
    //               <span>Track your progress and performance over time</span>
    //             </li>
    //           </ul>
    //         </CardContent>
    //       </Card>
    //     </div>

    //     <div className="mt-8 flex justify-center">
    //       <Button size="lg" onClick={handleContinue} disabled={!selectedRole}>
    //         Continue as {selectedRole === "teacher" ? "Quiz Creator" : selectedRole === "student" ? "Quiz Taker" : "..."}
    //         <ChevronRight className="ml-2 h-4 w-4" />
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};
