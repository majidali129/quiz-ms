import { Award, Calendar, Clock, MoreHorizontal, Play, Trophy, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { isTeacher } from "@/features/utils/is-teacher";
import { ROLE } from "@/types/index";
import { format } from "date-fns";
import { Quiz, QuizCompleteStatus, QuizDifficulty, QuizType } from "../types";
import { QuizCardMoreMenu } from "./quiz-more-menu";

interface QuizItemProps {
  quiz: Quiz;
  role: ROLE;
}

export const QuizCard = ({ quiz, role }: QuizItemProps) => {
  const { title, description, course, quizType, createdAt, createdBy, difficulty, completionStatus } = quiz;

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

  const getProgressValue = (status?: QuizCompleteStatus) => {
    if (!status) return 0;
    if (status === "completed") return 100;
    if (status === "in-progress") return 60;
    return 0;
  };

  const quizMoreMenu = (
    <QuizCardMoreMenu
      role={role}
      trigger={
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      }
      quiz={quiz}
    />
  );

  return (
    <Card className={`w-full border-0 gap-3 py-4 `}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50 line-clamp-1">{title}</h3>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <Badge variant="outline" className="font-normal">
                {course.title}
              </Badge>
              <Badge className={`font-normal ${getQuizTypeColor(quizType)}`}>{quizType}</Badge>
              <Badge className={`font-normal ${getDifficultyColor(difficulty)}`}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Badge>
              {!isTeacher(role) && completionStatus && (
                <Badge className={`font-normal ${getStatusColor(completionStatus)}`}>{completionStatus === "not-started" ? "Not Started" : completionStatus === "in-progress" ? "In Progress" : "Completed"}</Badge>
              )}
              {/* {isActive === false && (
                <Badge variant="outline" className="font-normal text-zinc-500 dark:text-zinc-400">
                  Inactive
                </Badge>
              )} */}
            </div>
          </div>

          {quizMoreMenu}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">{description || "No description provided."}</p>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mt-2">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            {/* <span>{duration} min</span> */}
            <span>{32} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            {/* <span>{format(startDate, "MM/dd/yyyy")}</span> */}
            <span>{format(new Date(), "MM/dd/yyyy")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            {/* <span>Pass: {passingScore}%</span> */}
            <span>Pass: {43}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span className="truncate">{createdBy.userName}</span>
          </div>
        </div>

        {!isTeacher && completionStatus && (
          <div className="mt-4">
            {completionStatus === "in-progress" && (
              <>
                <div className="flex justify-between text-xs mb-1 text-zinc-600 dark:text-zinc-400">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
                <Progress value={getProgressValue(completionStatus)} className="h-1.5" />
              </>
            )}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
          <span>Created {format(createdAt, "MM/dd/yyyy")}</span>
          {/* {isTeacher && isActive !== false ? (
            <Badge variant="outline" className="font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20">
              Active
            </Badge>
          ) : null} */}
        </div>
      </CardContent>
      <CardFooter className="pt-2 ">
        {!isTeacher && (
          <div className="flex flex-wrap gap-2 w-full">
            {completionStatus === QuizCompleteStatus["not-started"] && (
              <Button size="sm" className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Start Quiz
              </Button>
            )}
            {completionStatus === QuizCompleteStatus["in-progress"] && (
              <Button size="sm" className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Resume Quiz
              </Button>
            )}
            {completionStatus === QuizCompleteStatus.completed && (
              <Button size="sm" variant="outline" className="flex-1">
                <Trophy className="mr-2 h-4 w-4" />
                View Results
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
