import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import { CalendarDaysIcon, StarIcon } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { InterviewService } from "@/services/interview.service";

import { Button } from "@/components/ui/button";
import { DisplayTechStack } from "@/components/shared/display-tech-stack";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { Feedback, Interview } from "@/types";
import { cn } from "@/lib/utils";

const coverByType: Record<string, string> = {
  technical: "/covers/technical-interview-3.jpg",
  behavioral: "/covers/behavioral-interview.jpg",
  mix: "/covers/mix-interview.jpg",
};

export const InterviewCard = async ({ interview }: { interview: Interview }) => {
  const user = await getCurrentUser();

  const feedback: Feedback | null =
    interview.id && user!.id ? await InterviewService.getFeedback(interview.id, user!.id) : null;

  return (
    <Card className="justify-self-center @container">
      <CardHeader className="relative flex flex-col gap-4">
        <div className="absolute -top-6 right-0 bg-[#24273A] py-3 font-medium rounded-bl-xl px-4 capitalize">
          {interview.type}
        </div>
        <Image
          width={90}
          height={90}
          src={coverByType[interview.type.toLowerCase()]}
          alt={interview.role}
          className="rounded-full aspect-square object-cover"
        />
        <h3 className="text-xl font-semibold capitalize">{interview.role} Interview</h3>
        <div className="flex gap-6">
          <div className="flex gap-2 items-center text-accent-foreground">
            <CalendarDaysIcon className="w-5 h-5" />
            {dayjs(interview.createdAt).format("MMM D, YYYY")}
          </div>
          <div className="flex gap-2 items-center text-accent-foreground">
            <StarIcon className="w-5 h-5" />
            <p>{feedback?.totalScore || "--- "}/100</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col grow">
        <p className="text-ellipsis overflow-hidden line-clamp-3">
          {feedback?.finalAssessment ||
            "You havent taken this interview yet. Take it now to improve your skills."}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col @min-[395px]:flex-row gap-2 justify-between">
        <DisplayTechStack className="hidden @min-[395px]:flex" techstack={interview.techstack} />
        <Button asChild className={cn(feedback && "bg-teal-600 hover:bg-teal-700")}>
          <Link
            href={feedback ? `/interview/${interview.id}/feedback` : `/interview/${interview.id}`}
          >
            {feedback ? "Check Feedback" : "Take Interview"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
