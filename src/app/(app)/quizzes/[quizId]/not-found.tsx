import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { teacherQuizesPath } from "@/paths/paths";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder
      button={
        <Button asChild variant={"outline"}>
          <Link href={teacherQuizesPath()}>Go to quizzes</Link>
        </Button>
      }
      label="We could not find your quiz"
    />
  );
}
