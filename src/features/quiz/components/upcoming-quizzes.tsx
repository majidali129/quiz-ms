import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { quizPath, quizzesPath } from "@/paths/paths";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Quiz } from "../types";

type UpcomingQuizzesProps = {
  quizzes: Quiz[];
};
export const UpcomingQuizzes = ({ quizzes }: UpcomingQuizzesProps) => {
  return (
    <Card className="gap-2 rounded">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          Upcoming Quizzes{" "}
          <Link href={quizzesPath()} className="text-primary">
            View All
          </Link>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className="space-y-1.5 max-h-[250px] h-full overflow-y-auto hide-scroll">
          {quizzes.map((quiz) => (
            <UpcomingQuizeItem key={quiz._id} quiz={quiz} />
          ))}
        </ul>{" "}
      </CardContent>
    </Card>
  );
};

type UpcomingQuizItemProps = {
  quiz: Quiz;
};
function UpcomingQuizeItem({ quiz }: UpcomingQuizItemProps) {
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
      <Button asChild size="sm" className="text-[.84rem]">
        <Link href={quizPath(quiz._id)} className={buttonVariants({ variant: "default" })}>
          Start Quiz
        </Link>
      </Button>
    </div>
  );
}
