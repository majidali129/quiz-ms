import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { quizzesPath } from "@/paths/paths";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder
      button={
        <Button asChild variant={"outline"}>
          <Link href={quizzesPath()}>Go to quizzes</Link>
        </Button>
      }
      label="We could not find your quiz"
    />
  );
}
