import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/auth";
import { InterviewService } from "@/services/interview.service";
import dayjs from "dayjs";
import { CalendarDaysIcon, StarIcon } from "lucide-react";
import { redirect } from "next/navigation";

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
    <section className="section h-fit max-w-4xl pb-20">
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

        <p className="text-3xl font-bold mt-16">
          Final Veredict:{" "}
          <span className="text-red-400 bg-slate-700 py-1 px-4 rounded-full">Not Recommended</span>
        </p>
      </div>
    </section>
  );
}
