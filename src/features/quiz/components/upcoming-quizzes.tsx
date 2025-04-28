import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import Link from "next/link";

export const UpcomingQuizzes = () => {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          Upcoming Quizzes{" "}
          <Link href="" className="text-primary">
            View All
          </Link>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className="space-y-1.5">
          <UpcomingQuizeItem />
          <UpcomingQuizeItem />
          <UpcomingQuizeItem />
        </ul>{" "}
      </CardContent>
    </Card>
  );
};

function UpcomingQuizeItem() {
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
      <Button className="text-[.84rem]" size={"sm"}>
        Start Quiz
      </Button>
    </div>
  );
}
