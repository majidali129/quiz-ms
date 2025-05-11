"use client";

import { CheckCircle, ChevronLeft, ChevronRight, Clock, Flag, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect, useRef, useState, useTransition } from "react";

import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useMobile } from "@/hooks/use-mobile";
import { quizPath } from "@/paths/paths";
import { submitQuiz } from "../actions/submit-quiz";
import { Quiz } from "../types";

type QuizAttemptProps = {
  quiz: Quiz;
};
export const QuizAttempt = ({ quiz }: QuizAttemptProps) => {
  const router = useRouter();
  const isMobile = useMobile();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(quiz.settings.duration * 60); // in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isSubmitting, startTransition] = useTransition();
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(!isMobile);
  const [state, submitAction] = useActionState(submitQuiz.bind(null, quiz._id, answers), Empty_Action_State);

  // Refs
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined); // Changed from null to undefined

  // Auto-submit when time reaches 0
  const handleAutoSubmit = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }

    startTransition(() => {
      submitAction();
      setIsQuizSubmitted(true);

      setTimeout(() => {
        router.push(quizPath(quiz._id));
      }, 700);
    });
  }, [quiz._id, router]);
  console.log(isSubmitting);

  useEffect(() => {
    if (timeRemaining <= 0 && !isQuizSubmitted) {
      handleAutoSubmit();
    }
  }, [timeRemaining, isQuizSubmitted, handleAutoSubmit]);

  console.log(isSubmitting);
  console.log(state);

  // Effects for timer
  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Handlers
  const handleAnswerChange = (questionId: string, option: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    if (isMobile) {
      setIsNavigatorOpen(false);
    }
  };

  const handleToggleMarkForReview = (questionId: string) => {
    setMarkedForReview((prev) => {
      const reviewSet = new Set(prev);
      if (reviewSet.has(questionId)) {
        reviewSet.delete(questionId);
      } else {
        reviewSet.add(questionId);
      }
      return reviewSet;
    });
  };

  // Helper functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getQuestionStatus = (questionId: string) => {
    if (markedForReview.has(questionId)) {
      return "review";
    }
    if (answers[questionId]) {
      return "answered";
    }
    return "unanswered";
  };

  const getCompletionPercentage = () => {
    const answeredCount = Object.keys(answers).length;
    return (answeredCount / quiz.questions.length) * 100;
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const renderQuestionNavigator = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Question Navigator</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {Object.keys(answers).length} / {quiz.questions.length}
            </Badge>
            <span className="text-sm ">Answered</span>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsNavigatorOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        <div className="grid grid-cols-5 gap-2">
          {quiz.questions.map((question, index) => {
            const status = getQuestionStatus(question._id);
            let bgColor = "bg-gray-200";
            let textColor = "text-gray-700";

            if (status === "answered") {
              bgColor = "bg-green-200";
              textColor = "text-green-800";
            } else if (status === "review") {
              bgColor = "bg-yellow-200";
              textColor = "text-yellow-800";
            }

            if (index === currentQuestionIndex) {
              bgColor = "bg-blue-200";
              textColor = "text-blue-800";
            }

            return (
              <button key={question._id} className={`${bgColor} ${textColor} h-10 w-10 rounded flex items-center justify-center font-medium text-sm relative`} onClick={() => handleJumpToQuestion(index)}>
                {index + 1}
                {status === "review" && (
                  <span className="absolute -top-1 -right-1">
                    <Flag className="h-3 w-3 text-yellow-600" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-200"></div>
            <span className="text-sm">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-200"></div>
            <span className="text-sm">Marked for review</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200"></div>
            <span className="text-sm">Unanswered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-200"></div>
            <span className="text-sm">Current question</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <Button className="w-full" variant="destructive" onClick={() => setIsSubmitDialogOpen(true)}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );

  // if (isQuizSubmitted) {
  //   return (
  //     <div className="container mx-auto py-12 px-4">
  //       <Card className="max-w-2xl mx-auto">
  //         <CardContent className="pt-6 pb-8 text-center">
  //           <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
  //           <h1 className="text-2xl font-bold mb-2">Quiz Submitted Successfully!</h1>
  //           <p className="text-gray-600 mb-6">Your answers have been recorded. You will receive your results shortly.</p>
  //           <Button>Return to Dashboard</Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-lg font-medium">Submitting your quiz...</p>
            <p className="text-muted-foreground">You&apos;ll be redirected shortly</p>
          </div>
        </div>
      )}
      <header className={`border-b sticky top-0 z-40 bg-background ${isSubmitting ? "opacity-50 pointer-events-none" : ""}  `}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold">{quiz.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={getCompletionPercentage()} className="h-2 w-32" />
                <span className="text-sm text-gray-500">
                  {Object.keys(answers).length} of {quiz.questions.length} answered
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${timeRemaining < 300 ? "text-red-600" : ""}`}>
                <Clock className="h-5 w-5" />
                <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
              </div>

              {/* Question navigator (mobile)*/}
              {isMobile && (
                <Drawer open={isNavigatorOpen} onOpenChange={setIsNavigatorOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[80vh]">{renderQuestionNavigator()}</DrawerContent>
                </Drawer>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex z-10 ">
        {/* Question navigator (desktop) */}
        {!isMobile && <aside className="w-64 border-r sticky top-[64px] overflow-hidden flex flex-col">{renderQuestionNavigator()}</aside>}

        {/* Question content */}
        <main className="flex-1 py-6 px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="py-2">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-medium">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => handleToggleMarkForReview(currentQuestion._id)}>
                    <Flag className={`h-4 w-4 mr-2 ${markedForReview.has(currentQuestion._id) ? "text-yellow-600" : ""}`} />
                    {markedForReview.has(currentQuestion._id) ? "Marked for review" : "Mark for review"}
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="py-2">
                  <p className="text-lg mb-6">{currentQuestion.questionText}</p>

                  <RadioGroup value={String(answers[currentQuestion._id])} onValueChange={(value) => handleAnswerChange(currentQuestion._id, Number(value))} className="space-y-2">
                    {currentQuestion.options.map((option, index) => (
                      <div key={option} className="flex items-start space-x-2 p-3 rounded border">
                        <RadioGroupItem value={String(index)} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Question Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {isLastQuestion ? (
                <Button onClick={() => setIsSubmitDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                  Submit Quiz
                  <CheckCircle className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Submit confirmation dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz?</DialogTitle>
            <DialogDescription>You are about to submit your quiz. Please review your answers before submitting.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span>Total questions:</span>
              <span className="font-medium">{quiz.questions.length}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>Answered:</span>
              <span className="font-medium text-green-600">{Object.keys(answers).length}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>Unanswered:</span>
              <span className="font-medium text-red-600">{quiz.questions.length - Object.keys(answers).length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Marked for review:</span>
              <span className="font-medium text-yellow-600">{markedForReview.size}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Continue Quiz
            </Button>
            <form action={submitAction}>
              <SubmitButton label="Submit Quiz" />
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
