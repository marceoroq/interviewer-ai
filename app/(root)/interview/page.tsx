import { redirect } from "next/navigation";
import { AgentGrid } from "@/components/shared/agent/agent-grid";
import { getCurrentUser } from "@/lib/auth";

export default async function InterviewPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/");

  return (
    <section className="section">
      <h2 className="text-2xl font-semibold">Interview Generation</h2>
      <p className="text-sm text-muted-foreground">
        Interact with AI to create your personalized interview. Simply specify your profile (e.g.,
        backend developer), preferred technologies (like Java, Spring), experience level, and choose
        between technical, behavioral, or mixed questions. Specify the number of questions (up to
        10) and the AI will generate your personalized interview questions to help you prepare
        effectively.
      </p>

      <AgentGrid username={user.name} userId={user.id} avatar={user.avatar} type="generate" />
    </section>
  );
}
