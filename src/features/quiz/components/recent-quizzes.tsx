import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dot, Edit, Trash2 } from "lucide-react";

export const RecentQuizzes = () => {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          Recent Quizzes <Button size={"sm"}>Create Quiz</Button>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className="space-y-1.5">
          <RecentQuizItem />
          <RecentQuizItem />
          <RecentQuizItem />
        </ul>{" "}
      </CardContent>
    </Card>
  );
};

function RecentQuizItem() {
  return (
    <div className="px-3.5 py-2 bg-zinc-950/40 flex rounded  items-center justify-between">
      <div>
        <h4 className="text-[.9rem]">Mathematics 101</h4>
        <p className="flex items-center text-muted-foreground text-[.8rem]">
          <span>{40} questions</span>
          <Dot />
          <span>{45} minutes</span>
        </p>
      </div>
      <div className="flex items-center gap-3  *:cursor-pointer *:transition-all *:duration-200 *:ease-in-out">
        <div className="rounded-sm !bg-card w-7 flex items-center justify-center h-7 p-1 hover:scale-105">
          <Edit className="text-primary/90 hover:text-primary" />
        </div>
        <div className="rounded-sm !bg-card w-7 flex items-center justify-center h-7 p-1 hover:scale-105">
          <Trash2 className="text-destructive/90 hover:text-destructive" />
        </div>
      </div>
    </div>
  );
}
