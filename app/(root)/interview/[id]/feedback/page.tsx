import Link from "next/link";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { CalendarDaysIcon, StarIcon } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { InterviewService } from "@/services/interview.service";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VeredictBadge } from "@/components/shared/veredict-badge";

export default async function FeedbackDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const feedback = await InterviewService.getFeedback(id, user.id);
  if (!feedback) {
    return <div>Feedback not found</div>;
  }

  const interview = await InterviewService.getInterviewById(id)!;

  return (
    <section className="section h-fit max-w-4xl pb-8">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Feedback on the Interview — {interview?.role}
      </h1>

      <div className="flex justify-center gap-6">
        <div className="flex text-lg gap-2 items-center text-accent-foreground">
          <StarIcon className="w-5 h-5" />
          <p>
            Overall Impressiones:{" "}
            <span className="font-bold">{feedback?.totalScore || "--- "}</span>/100
          </p>
        </div>
        <div className="flex gap-2 items-center text-accent-foreground">
          <CalendarDaysIcon className="w-5 h-5" />
          {dayjs(interview?.createdAt).format("MMM D, YYYY - h:mm A")}
        </div>
      </div>

      <Separator />

      <div className="px-16">
        <p className="mb-6 leading-6.5">{feedback?.finalAssessment}</p>

        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-4">Breakdown of Evaluation:</h2>
          <ol className="list-decimal ml-8">
            {feedback.categoryScores.map((category) => (
              <li key={category.name} className="text-lg font-bold">
                <h3 className="mb-2 text-orange-200">
                  {category.name} ({category.score}/100)
                </h3>
                <p className="text-base leading-7 font-normal mb-6">{category.comment}</p>
              </li>
            ))}
          </ol>
        </div>

        {feedback.strengths.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Strenghts:</h3>
            <ul className="ml-8">
              {feedback.strengths.map((strength) => (
                <li className="list-disc mb-2" key={strength}>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {feedback.areasForImprovement.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Areas for Improvement:</h3>
            <ul className="ml-8">
              {feedback.areasForImprovement.map((strength) => (
                <li className="list-disc mb-2" key={strength}>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-3xl font-bold my-8">
          Final Veredict: <VeredictBadge totalScore={feedback?.totalScore || 0} />
        </p>

        <div className="flex gap-4 w-full mt-16">
          <Button asChild variant="secondary" className="flex-grow cursor-pointer">
            <Link href="/">Back to Dashboard</Link>
          </Button>
          <Button asChild className="flex-grow cursor-pointer">
            <Link href={`/interview/${id}`}>Retake Interview</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
