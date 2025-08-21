import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { InterviewService } from "@/services/interview.service";

import { Banner } from "@/components/shared/banner";
import { InterviewCard } from "@/components/shared/interview-card";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  const [userInterviews, othersInterviews] = await Promise.all([
    InterviewService.getInterviewsByUserId(user.id),
    InterviewService.getLatestInterviews({ userId: user.id }),
  ]);

  return (
    <section className="section">
      <Banner />
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Your Interviews</h2>
        {userInterviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-accent-foreground">
            You haven&apos;t taken any interviews yet.
          </p>
        )}
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Take an Interviews</h2>
        {othersInterviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {othersInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-accent-foreground">There are no interviews available.</p>
        )}
      </section>
    </section>
  );
}
