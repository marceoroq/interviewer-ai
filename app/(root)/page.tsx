import { Banner } from "@/components/shared/banner";
import { InterviewCard } from "@/components/shared/interview-card";
import { dummyInterviews } from "@/constants";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/firebase/admin";
import { Interview } from "@/types";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  const interviews = await db.collection("interviews").where("userid", "==", user.id).get();
  const interviewData = interviews.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];

  return (
    <section className="section">
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
        {interviewData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interviewData.map((interview) => (
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
