import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import { CalendarDaysIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { getDevIconUrl } from "@/lib/utils";
import { interviewCovers } from "@/constants";
import { Feedback, Interview } from "@/types";

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
          {interview.techstack.map((tech) => (
            <div className="group rounded-full relative -ml-1 first:ml-0" key={tech}>
              <Image
                className="bg-[#1A1C2A] group border border-[#242633] aspect-square rounded-full p-2 -ml-1 first:ml-0"
                width={40}
                height={40}
                src={getDevIconUrl(tech) || "/tech.svg"}
                alt={tech}
              />
              <span className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md">
                {tech}
              </span>
            </div>
          ))}
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
