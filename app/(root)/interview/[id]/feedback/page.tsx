import { InterviewService } from "@/services/interview.service";

export default async function FeedbackDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const feedback = await InterviewService.getFeedback(id);
  if (!feedback) {
    return <div>Feedback not found</div>;
  }

  const interview = await InterviewService.getInterviewById(id)!;

  return (
    <section className="section max-w-3xl text-center">
      <h1 className="text-5xl font-bold mb-4">Feedback on the Interview — {interview?.role}</h1>
      <pre>{JSON.stringify(feedback, null, 2)}</pre>
    </section>
  );
}
