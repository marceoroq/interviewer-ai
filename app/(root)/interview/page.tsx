import { Agent } from "@/components/shared/agent";
import { Message } from "@/components/shared/message";
import { CallButton } from "@/components/shared/call-button";

export default function InterviewPage() {
  const callStatus = "ACTIVE";

  const messages = ["What is your name?", "My name is Chelo, nice to meet you!"];
  const lastMessage = messages.at(-1);

  return (
    <section className="section">
      <h2 className="text-2xl font-semibold">Interview Generation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Agent
          username="AI Inverviewer"
          variant="alternative"
          avatar="/ai-avatar.webp"
          isSpeaking={true}
        />
        <Agent username="You" avatar="/user-avatar.jpg" className="hidden md:block" />
      </div>

      {messages.length > 0 && <Message message={lastMessage!} />}

      <div className="w-full flex justify-center">
        <CallButton callStatus={callStatus} />
      </div>
    </section>
  );
}
