import { InterviewService } from "@/services/interview.service";

export default async function FeedbackDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const feedback = await InterviewService.getFeedback(id);
  if (!feedback) {
    return <div>Feedback not found</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(feedback, null, 2)}</pre>
    </div>
  );
}
