import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import { QuizResult } from "../types";

type RecentResultsProps = {
  results: QuizResult[];
};
export const RecentResults = ({ results }: RecentResultsProps) => {
  return (
    <Card className="gap-3  ">
      <CardHeader className="max-h-16">
        <CardTitle>Recent Results</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className="space-y-1.5 max-h-[250px] h-full overflow-y-auto hide-scroll">
          {results.map((result) => (
            <RecentResultItem key={result._id} result={result} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

type RecentResultItemProps = {
  result: QuizResult;
};
function RecentResultItem({ result }: RecentResultItemProps) {
  console.log(result);
  const total = result.totalQuestions;
  const correct = result.submission.filter((q) => q.isCorrect).length;

  const passPercentage = total > 0 ? (correct / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3.5 not-last:border-b border-b-border pb-1 ">
      <Avatar>
        <AvatarImage src={result.student.picture || "https://github.com/shadcn.png"} alt="@shadcn" />
        <AvatarFallback>{result.student.userName.slice(0, 2).toUpperCase() || "CN"}</AvatarFallback>
      </Avatar>

      <div>
        <h4 className="text-[.9rem]">{result.student.userName}</h4>
        <div className="flex items-center text-muted-foreground gap-1 text-[.8rem]">
          {result.quiz.title}
          <div className="flex items-center">
            <span> {} </span>
            <Dot className="w-4 h-4" />
            <span>{passPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
