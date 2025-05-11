import { format } from "date-fns";
import { Award, Calendar, CheckCircle2, Clock, FileText, Timer, Trophy, User, XCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz, QuizResult } from "../types";

type QuizSubmissionResultProps = {
  quiz: Quiz;
  result: QuizResult;
};
export const QuizSubmissionResult = ({ quiz, result }: QuizSubmissionResultProps) => {
  function formatTime(date: Date): string {
    return format(date, "p");
  }
  function formatDate(date: Date): string {
    return format(date, "PPP");
  }

  return (
    <div className="space-y-6 p-6">
      {/* Quiz Details Card */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{quiz.settings.duration} minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <Award className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Passing Score</p>
                <p className="font-medium">{quiz.settings.passingScore}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{formatDate(quiz.createdAt)}</p>
              </div>
            </div>
          </div>

          {!result && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-between bg-gray-50 p-6 rounded-lg border">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold mb-1">You haven&apos;t attempted this quiz yet</h3>
                <p className="text-gray-600">Take the quiz to test your knowledge</p>
              </div>
              <Button size="lg">
                Start Quiz
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiz Result Card (if attempted) */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Your Quiz Result</CardTitle>
            <CardDescription>
              Attempted on {formatDate(result.submittedAt)} at {formatTime(result.submittedAt)}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Score */}
              <div className="flex flex-col items-center justify-center p-6 rounded border border-border shadow">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                    <circle
                      className={`${result.isPassed ? "text-green-500" : "text-red-500"}`}
                      strokeWidth="8"
                      strokeDasharray={365}
                      strokeDashoffset={365 - (365 * result.score) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-3xl font-bold">{result.score}%</p>
                    <p className="text-sm text-gray-500">Score</p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Badge className={`${result.isPassed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} px-3 py-1 text-sm font-medium`}>{result.isPassed ? "PASSED" : "FAILED"}</Badge>
                  <p className="mt-2 text-sm text-gray-500">{result.isPassed ? "Congratulations! You passed the quiz." : `You need ${quiz.settings.passingScore}% to pass.`}</p>
                </div>
              </div>

              {/* Right Column - Details */}
              <div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={result.student.picture || "/placeholder.svg"} alt={result.student.userName} />
                      <AvatarFallback>{result.student.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-500">Student</p>
                      <p className="font-medium">{result.student.userName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Trophy className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Correct Answers</p>
                      <p className="font-medium">
                        {result.submission.filter((a) => a.isCorrect).length} of {result.totalQuestions}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Attempt</p>
                      <p className="font-medium">#{result.attemptNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Timer className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Submitted</p>
                      <p className="font-medium">
                        {formatDate(result.submittedAt)} at {formatTime(result.submittedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Summary */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Question Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Correct Answers</p>
                    <p className="text-2xl font-bold text-green-700">{result.submission.filter((a) => a.isCorrect).length}</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Incorrect Answers</p>
                    <p className="text-2xl font-bold text-red-700">{result.submission.filter((a) => !a.isCorrect).length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Performance */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Performance by Question</h3>
              <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden">
                {result.submission.map((answer, index) => (
                  <div
                    key={index}
                    className={`h-full ${answer.isCorrect ? "bg-green-500" : "bg-red-500"} inline-block`}
                    style={{
                      width: `${100 / result.submission.length}%`,
                    }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Question 1</span>
                <span>Question {result.submission.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
