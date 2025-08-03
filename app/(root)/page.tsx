import { Banner } from "@/components/shared/banner";
import { InterviewCard } from "@/components/shared/interview-card";
import { dummyInterviews } from "@/constants";

export default function HomePage() {
  return (
    <section className="flex max-w-7xl mx-auto w-full px-8 xl:px-4 py-4 flex-col h-screen gap-6">
      <Banner />
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Your Interviews</h2>
        {dummyInterviews ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyInterviews.map((interview) => (
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
        {dummyInterviews ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyInterviews.map((interview) => (
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
