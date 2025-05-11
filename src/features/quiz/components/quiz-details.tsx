import { format, isBefore, parse } from "date-fns";
import { ArrowLeft, Award, Calendar, CheckCircle, Clock, Edit, Eye, FileQuestion, MoveUpRightIcon, Repeat, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/queries/get-auth";
import { getCourses } from "@/features/queries/get-courses";
import { getQuizResult } from "@/features/queries/get-quiz-result";
import { getQuizStats } from "@/features/queries/get-quiz-stats";
import { isTeacher } from "@/features/utils/is-teacher";
import { quizAttemptPath, quizzesPath } from "@/paths/paths";
import Link from "next/link";
import { Quiz, QuizCompleteStatus, QuizDifficulty, QuizType } from "../types";
import { CreateQuizForm } from "./create-quiz-form";
import { DialogShell } from "./dialog-shell";
import { QuizDeleteButton } from "./quiz-delete-button";
import { QuizSubmissionResult } from "./quiz-submission-result";
// Sample student attempts data
const studentAttempts = [
  {
    attemptNumber: 1,
    date: "2023-05-16",
    score: 60,
    passed: false,
    timeSpent: "25 minutes",
  },
  {
    attemptNumber: 2,
    date: "2023-05-17",
    score: 80,
    passed: true,
    timeSpent: "22 minutes",
  },
];

type QuizDetailsProps = {
  quiz: Quiz;
};
export const QuizDetails = async ({ quiz }: QuizDetailsProps) => {
  const user = await getAuth();
  const courses = getCourses(user.id);
  const quizResult = await getQuizResult(quiz._id);
  const isAllowToAttempt = !quizResult || quizResult?.attemptNumber < quiz.settings.maxAttempts;
  const quizStartDateTime = parse(`${quiz.schedule.startDate} ${quiz.schedule.startTime}`, "yyyy-MM-dd HH:mm", new Date());
  const now = new Date();

  const isBeforeTheTime = isBefore(now, quizStartDateTime);

  const stats = await getQuizStats(quiz._id);

  const getDifficultyColor = (difficulty: QuizDifficulty) => {
    const colors = {
      easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      hard: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
    };
    return colors[difficulty];
  };

  const getQuizTypeColor = (type: QuizType) => {
    return type === QuizType.Objective ? "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300" : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
  };

  const getStatusColor = (status?: QuizCompleteStatus) => {
    if (!status) return "";

    const colors = {
      "not-started": "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    };
    return colors[status];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const editButton = (
    <DialogShell
      title="Update quiz"
      description="Update quiz details"
      triggerText="Edit"
      trigger={
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </DialogTrigger>
      }
    >
      <CreateQuizForm quiz={quiz} coursesPromise={courses} />
    </DialogShell>
  );

  return (
    <>
      <div className="w-full p-6 space-y-5">
        <Link href={quizzesPath()} className={buttonVariants({ variant: "ghost" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline" className="font-normal">
                {quiz.course.title}
              </Badge>
              <Badge className={`font-normal ${getQuizTypeColor(quiz.quizType)}`}>{quiz.quizType}</Badge>
              <Badge className={`font-normal ${getDifficultyColor(quiz.difficulty)}`}>{quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}</Badge>
              {isTeacher(user.role) && quiz.completionStatus && (
                <Badge className={`font-normal ${getStatusColor(quiz.completionStatus)}`}>{quiz.completionStatus === "not-started" ? "Not Started" : quiz.completionStatus === "in-progress" ? "In Progress" : "Completed"}</Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {isTeacher(user.role) ? (
              <>
                {editButton}
                <QuizDeleteButton quizId={quiz._id} />
              </>
            ) : (
              <>
                {isAllowToAttempt && isBeforeTheTime && (
                  <Button asChild>
                    <Link href={quizAttemptPath(quiz._id)} className={buttonVariants({ variant: "outline" })}>
                      <MoveUpRightIcon className="h-4 w-4" />
                      Join Quiz
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Quiz Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Quiz Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <Card className="gap-0">
              <CardHeader>
                <CardTitle className="text-xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-700 dark:text-zinc-300">{quiz.description}</p>
              </CardContent>
            </Card>

            {/* Questions Preview (for teachers only) or Quiz Information (for students) */}
            {isTeacher(user.role) ? (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Questions</CardTitle>
                  <CardDescription>Preview of quiz questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quiz.questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4 dark:border-zinc-800">
                      <p className="font-medium mb-2">
                        {index + 1}. {question.questionText}
                      </p>
                      <div className="ml-4 space-y-1">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                optionIndex === question.correctOption ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                              }`}
                            >
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span className={optionIndex === question.correctOption ? "text-green-700 dark:text-green-400" : "text-zinc-700 dark:text-zinc-300"}>{option}</span>
                            {optionIndex === question.correctOption && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 ml-auto" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Quiz Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-zinc-700 dark:text-zinc-300">
                      This quiz contains {quiz.questions.length} questions and must be completed within {quiz.settings?.duration} minutes. You need to score at least {quiz.settings?.passingScore}% to pass.
                    </p>

                    {quiz.completionStatus === "in-progress" && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Your progress</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    )}

                    {quiz.completionStatus === "completed" && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium">
                          <CheckCircle className="h-5 w-5" />
                          <span>You&apos;ve completed this quiz</span>
                        </div>
                        <p className="mt-2 text-green-700 dark:text-green-400">Your highest score: 80% (Passed)</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Student Attempts (for students) or Quiz Statistics (for teachers) */}
            {isTeacher(user.role) ? (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Quiz Statistics</CardTitle>
                  <CardDescription>Overview of student performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Attempts</p>
                      <p className="text-2xl font-semibold">{stats.totalAttempts}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Average Score</p>
                      <p className="text-2xl font-semibold">{stats.averageScore}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Pass Rate</p>
                      <p className="text-2xl font-semibold">{stats.passRate}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Highest Score</p>
                      <p className="text-2xl font-semibold">{stats.highestScore}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Lowest Score</p>
                      <p className="text-2xl font-semibold">{stats.lowestScore}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              quiz.completionStatus === "completed" && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Your Attempts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studentAttempts.map((attempt, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg dark:border-zinc-800">
                          <div>
                            <p className="font-medium">
                              Attempt {attempt.attemptNumber} - {attempt.date}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Time spent: {attempt.timeSpent}</p>
                          </div>
                          <div className="mt-2 sm:mt-0 flex items-center gap-2">
                            <Badge className={attempt.passed ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}>
                              {attempt.score}% - {attempt.passed ? "Passed" : "Failed"}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Right Column - Quiz Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Quiz Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Start Date</p>
                    <p className="font-medium">
                      {formatDate(quiz.schedule?.startDate)} at {quiz.schedule?.startTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Duration</p>
                    <p className="font-medium">{quiz.settings?.duration} minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileQuestion className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Questions</p>
                    <p className="font-medium">{quiz.questions.length} questions</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Repeat className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Attempts Allowed</p>
                    <p className="font-medium">{quiz.settings.maxAttempts} attempts</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Passing Score</p>
                    <p className="font-medium">{quiz.settings.passingScore}%</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Created By</p>
                    <p className="font-medium">{quiz.createdBy.userName}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Created</p>
                  <p className="font-medium">{format(new Date(quiz.createdAt), "MMMM d, yyyy")}</p>
                </div>

                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Last Updated</p>
                  <p className="font-medium">{format(new Date(quiz.updatedAt), "MMMM d, yyyy")}</p>
                </div>

                {!isTeacher && quiz.completionStatus !== "not-started" && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Your Attempts</p>
                      <p className="font-medium">
                        {studentAttempts.length} of {quiz.settings.maxAttempts} used
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {quizResult && isTeacher(user.role) && <QuizSubmissionResult quiz={quiz} result={quizResult} />}
    </>
  );
};
