import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { interviewCovers } from "@/constants";
import { Feedback, Interview } from "@/types";
import dayjs from "dayjs";
import { CalendarDaysIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const InterviewCard = ({ interview }: { interview: Interview }) => {
  const feedback = null as Feedback | null;
  return (
    <Card className="justify-self-center">
      <CardHeader className="relative flex flex-col gap-4">
        <div className="absolute -top-6 right-0 bg-[#24273A] py-3 font-medium rounded-bl-xl px-4">
          {interview.type}
        </div>
        <Image
          width={90}
          height={90}
          src={`/covers${interviewCovers[Number(interview.id)]}`}
          alt={interview.role}
        />
        <h3 className="text-xl font-semibold">{interview.role} Interview</h3>
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
      <CardContent>
        <p className="">
          {feedback?.finalAssessment ||
            "You havent taken this interview yet. Take it now to improve your skills."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex">
          <Image
            className="bg-[#1A1C2A] border border-[#242633] rounded-full p-2"
            width={40}
            height={40}
            src="/react.svg"
            alt=""
          />
          <Image
            className="bg-[#1A1C2A] border border-[#242633] rounded-full p-2 -ml-1"
            width={40}
            height={40}
            src="/tailwind.svg"
            alt=""
          />
        </div>
        <Button asChild>
          <Link
            href={feedback ? `/interview/${interview.id}/feedback` : `/interview/${interview.id}`}
          >
            {feedback ? "Check Feedback" : "View Interview"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
