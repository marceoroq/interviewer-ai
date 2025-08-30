import Image from "next/image";
import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { InterviewService } from "@/services/interview.service";

import { AgentGrid } from "@/components/shared/agent/agent-grid";
import { DisplayTechStack } from "@/components/shared/display-tech-stack";

export default async function InterviewDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const interviewData = await InterviewService.getInterviewById(id);
  if (!interviewData) {
    return notFound();
  }

  const user = await getCurrentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const feedback = await InterviewService.getFeedback(id, user.id);

  return (
    <section className="section">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex gap-4 items-center">
            <Image
              src={interviewData.coverImage}
              alt="cover image"
              width={40}
              height={40}
              className="rounded-full object-cover size-10"
            />
            <h3 className="text-2xl font-semibold capitalize">{interviewData.role} Interview</h3>
          </div>

          <DisplayTechStack techstack={interviewData.techstack} />
        </div>
        <p className="bg-slate-700 px-4 py-2 rounded-lg h-fit capitalize">{interviewData.type}</p>
      </div>
      <AgentGrid
        username={user.name}
        userId={user.id}
        avatar={user.avatar}
        type="interview"
        interviewId={id}
        questions={interviewData.questions}
        hasFeedback={!!feedback}
      />
    </section>
  );
}
