import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { coursesPath } from "@/paths/paths";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder
      button={
        <Button asChild variant={"outline"}>
          <Link href={coursesPath()}>Go to courses</Link>
        </Button>
      }
      label="We could not find your course"
    />
  );
}
