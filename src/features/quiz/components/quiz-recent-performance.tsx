import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const QuizRecentPerformance = () => {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          Recent Performance{" "}
          <Link href="" className="text-primary">
            View All
          </Link>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className="space-y-1.5">
          <QuizRecentPerformanceItem />
          <QuizRecentPerformanceItem />
          <QuizRecentPerformanceItem />
        </ul>{" "}
      </CardContent>
    </Card>
  );
};

function QuizRecentPerformanceItem() {
  return (
    <div className="px-3.5 py-2 border border-border rounded space-y-1.5">
      <h4 className="text-[.9rem] flex items-center justify-between">
        Chemistery Quiz <span>{23}%</span>
      </h4>
      <Progress value={60} />
    </div>
  );
}
