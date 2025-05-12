import { format, isSameDay, isTomorrow } from "date-fns";
import { ArrowUpRight, Award, Calendar, CheckCircle2, Clock, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuth } from "@/features/auth/queries/get-auth";
import { QuizCompleteStatus, Quiz as QuizType } from "@/features/quiz/types";
import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";
import { QuizResult } from "@/models/quiz-results.-model";
import { quizPath, quizzesPath } from "@/paths/paths";
import Link from "next/link";

// Helper functions
function formatDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}

function formatDueDate(date: Date): string {
  // const date = parseISO(dateString);
  const now = new Date();

  if (isSameDay(date, now)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";

  return format(date, "MMMM dd, yyyy");
}

export const StudentDashboard = async () => {
  await connectDB();
  const user = await getAuth();
  const quizResults = await QuizResult.find({ student: user.id });
  const completedQuizzes = await QuizResult.countDocuments({ student: user.id }); //c2
  const passedCount = quizResults.filter((result) => result.isPassed === true).length;
  const totalAttempted = quizResults.length;
  const passRate = totalAttempted > 0 ? (passedCount / totalAttempted) * 100 : 0;
  const avgQuizScore = Math.round(quizResults.reduce((acc, q) => acc + q.score, 0) / (quizResults.length || 1)); // c3
  const totalQuizzes = await Quiz.countDocuments();
  const today = format(new Date(), "yyyy-MM-dd");
  const availableQuizzes = JSON.parse(JSON.stringify(await Quiz.find({ completionStatus: QuizCompleteStatus["in-progress"] }).populate({ path: "course", select: "_id title category" }))) as QuizType[];
  const recentQuizzes = JSON.parse(
    JSON.stringify(await Quiz.find({}).sort({ createdAt: -1 }).limit(5).populate({ path: "createdBy", select: "_id userName picture" }).populate({ path: "course", select: "_id title category" }))
  ) as QuizType[];
  const upcomingQuizzes = JSON.parse(
    JSON.stringify(
      await Quiz.find({
        "schedule.startDate": { $gte: today },
      }).populate({ path: "course", select: "_id title category" })
    )
  ) as QuizType[];

  return (
    <main>
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.userName}</p>
          </div>
          <Button asChild>
            <Link href={quizzesPath()} className={buttonVariants({ variant: "default" })}>
              Take New Quiz
              <FileText className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Quizzes</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{completedQuizzes}</p>
                    <p className="text-sm text-gray-500">/ {totalQuizzes}</p>
                  </div>
                </div>
              </div>
              <Progress value={(completedQuizzes / totalQuizzes) * 100} className="h-2 mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="text-2xl font-bold">{avgQuizScore}%</p>
                </div>
              </div>
              <Progress value={avgQuizScore} className="h-2 mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pass Rate</p>
                  <p className="text-2xl font-bold">{passRate}%</p>
                </div>
              </div>
              <Progress value={passRate} className="h-2 mt-4" />
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Points</p>
                  <p className="text-2xl font-bold">{totalPointsEarned}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <p className="text-sm text-gray-500">
                  Rank <span className="font-medium">#{studentStats.rank}</span> in your class
                </p>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 h-auto py-2 px-4 rounded-none md:w-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          {/* Upcoming Quizzes */}
          <TabsContent value="upcoming">
            <div className="grid gap-4">
              {upcomingQuizzes.length > 0 ? (
                upcomingQuizzes.map((quiz) => (
                  <Card key={quiz._id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{quiz.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline">{quiz.course.category}</Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <FileText className="h-4 w-4 mr-1" />
                                {quiz.questions.length} Questions
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {quiz.settings.duration} min
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end mt-4 md:mt-0">
                          <div className="flex items-center gap-2 text-orange-600 font-medium">
                            {/* <Timer className="h-4 w-4" /> */}
                            Due: {quiz.schedule.endDate && formatDueDate(new Date(quiz.schedule.endDate))}
                          </div>
                          {/* <Button className="mt-3 w-full md:w-auto">Start Quiz</Button> */}
                          <Link href={quizPath(quiz._id)} className={buttonVariants({ variant: "link" })}>
                            <ArrowUpRight />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Empty title="No Upcoming Quizzes" description="There are no upcoming quizzes for you at the moment. Check back later or contact your instructor." />
              )}
            </div>
          </TabsContent>

          {/* Recent Quizzes */}
          <TabsContent value="recent">
            <div className="grid gap-4">
              {recentQuizzes.length > 0 ? (
                recentQuizzes.map((quiz) => (
                  <Card key={quiz._id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className={`p-4 rounded-lg bg-green-50 `}>
                            <CheckCircle2 className="h-6 w-6 text-green-600" />{" "}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{quiz.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline">{quiz.course.category}</Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <FileText className="h-4 w-4 mr-1" />
                                {quiz.questions.length} Questions
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {quiz.settings.duration} min
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end mt-4 md:mt-0 space-y-1.5">
                          <div className="flex items-center gap-2">
                            {/* <Badge className={`${quiz.isPassed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{quiz.score}%</Badge> */}
                            <span className="text-sm text-gray-500">{quiz.createdAt && formatDate(quiz.createdAt)}</span>
                          </div>
                          {/* <Button asChild>
                            <Link href={quizPath(quiz._id)} className={buttonVariants({ variant: "outline" })}>
                              View Results
                            </Link>
                          </Button> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Empty title="No Recent Quizzes" description="You haven't taken any quizzes yet. Start with an available quiz to see your results here." />
              )}
            </div>
          </TabsContent>

          {/* Available Quizzes */}
          <TabsContent value="available">
            <div className="grid gap-4">
              {availableQuizzes.length > 0 ? (
                availableQuizzes.map((quiz) => (
                  <Card key={quiz._id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <FileText className="h-6 w-6 text-slate-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{quiz.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline">{quiz.course.category}</Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <FileText className="h-4 w-4 mr-1" />
                                {quiz.questions.length} Questions
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {quiz.settings.duration} min
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={quizPath(quiz._id)} className={buttonVariants({ variant: "default" })}>
                            Start Quiz
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Empty title="No Available Quizzes" description="There are no available quizzes for you at the moment. Check back later or contact your instructor." />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

function Empty({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center gap-2 py-8">
          <Calendar className="h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-gray-500 max-w-md">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
