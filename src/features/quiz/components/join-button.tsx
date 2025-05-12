"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { quizAttemptPath } from "@/paths/paths";
import { isAfter, isBefore, parse } from "date-fns";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const JoinButton = ({ startDate = "2025-05-12", startTime = "09:00", endDate = "2025-05-12", quizId }: { startDate: string; startTime: string; endDate: string; quizId: string }) => {
  const [canJoin, setCanJoin] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const now = new Date();

    const startDateTime = parse(`${startDate} ${startTime}`, "yyyy-MM-dd HH:mm", new Date());
    const endDateTime = new Date(endDate + "T23:59:59");

    if (now.getTime() === startDateTime.getTime() || isAfter(now, startDateTime)) {
      if (isBefore(now, endDateTime)) {
        setCanJoin(true);
        setStatus("Join");
      } else {
        setStatus("Time expired");
      }
    } else {
      setStatus(`Make sure to join at ${startTime}`);
    }
  }, [startDate, startTime, endDate]);

  console.log(canJoin);

  return canJoin ? (
    <Button asChild>
      <Link href={quizAttemptPath(quizId)} className={buttonVariants({ variant: "outline" })}>
        <MoveUpRightIcon className="h-4 w-4" />
        Join Quiz
      </Link>
    </Button>
  ) : (
    <div className="text-gray-500 italic">{status}</div>
  );
};
