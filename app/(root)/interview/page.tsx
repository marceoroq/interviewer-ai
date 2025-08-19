import { redirect } from "next/navigation";
import { AgentGrid } from "@/components/shared/agent/agent-grid";
import { getCurrentUser } from "@/lib/auth";

export default async function InterviewPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/");

  return (
    <section className="section">
      <h2 className="text-2xl font-semibold">Interview Generation</h2>

      <AgentGrid username={user.name} userId={user.id} type="generate" />
    </section>
  );
}
