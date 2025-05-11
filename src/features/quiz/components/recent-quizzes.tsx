import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { quizPath, quizzesPath } from "@/paths/paths";
import { ArrowUpRight, Dot, Trash2 } from "lucide-react";
import Link from "next/link";
import { Quiz } from "../types";

type RecentQuizzesProps = {
  quizzes: Quiz[];
};
export const RecentQuizzes = ({ quizzes }: RecentQuizzesProps) => {
  return (
    <Card className="gap-2 rounded">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          Recent Quizzes{" "}
          <Button asChild size="sm">
            <Link href={quizzesPath()} className={buttonVariants({ variant: "default" })}>
              Create Quiz
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className="space-y-1.5 max-h-[250px] h-full overflow-y-auto hide-scroll">
          {quizzes.map((quiz) => (
            <RecentQuizItem key={quiz._id} quiz={quiz} />
          ))}
        </ul>{" "}
      </CardContent>
    </Card>
  );
};

type RecentQuizItemProps = {
  quiz: Quiz;
};

function RecentQuizItem({ quiz }: RecentQuizItemProps) {
  return (
    <div className="px-3.5 py-2 bg-background not-dark:border flex rounded  items-center justify-between">
      <div>
        <h4 className="text-[.9rem]">{quiz.title}</h4>
        <p className="flex items-center text-muted-foreground text-[.8rem]">
          <span>{quiz.questions.length} questions</span>
          <Dot />
          <span>{quiz.settings.duration} minutes</span>
        </p>
      </div>
      <div className="flex items-center gap-3  *:cursor-pointer *:transition-all  *:ease-in-out">
        <div className="rounded-sm !bg-card w-7 flex items-center justify-center h-7 p-1 hover:scale-105">
          <Link href={quizPath(quiz._id)} className={buttonVariants({ variant: "link" })}>
            <ArrowUpRight />
          </Link>
        </div>
        {/* <div className="rounded-sm !bg-card w-7 flex items-center justify-center h-7 p-1 hover:scale-105 hidden"> */}
        <div className="rounded-sm !bg-card w-7  items-center justify-center h-7 p-1 hover:scale-105 hidden">
          <Trash2 className="text-destructive/90 hover:text-destructive" />
        </div>
      </div>
    </div>
  );
}
