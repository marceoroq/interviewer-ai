"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { vapi } from "@/lib/vapi";

import { Agent } from "@/components/shared/agent";
import { Message } from "@/components/shared/message";
import { CallButton } from "@/components/shared/call-button";
import { CallStatus } from "@/types";

interface AgentGridProps {
  username: string;
  userId: string;
  type: "generate" | "disconnect";
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export const AgentGrid = ({ username, userId, type }: AgentGridProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>("INACTIVE");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lastMessage = messages.at(-1)?.content;

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus("ACTIVE");
    };

    const onCallEnd = () => {
      setCallStatus("FINISHED");
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    // const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    //   console.log("handleGenerateFeedback");

    //   const { success, feedbackId: id } = await createFeedback({
    //     interviewId: interviewId!,
    //     userId: userId!,
    //     transcript: messages,
    //     feedbackId,
    //   });

    //   if (success && id) {
    //     router.push(`/interview/${interviewId}/feedback`);
    //   } else {
    //     console.log("Error saving feedback");
    //     router.push("/");
    //   }
    // };

    if (callStatus === "FINISHED") {
      if (type === "generate") {
        router.push("/");
      } else {
        // handleGenerateFeedback(messages);
      }
    }
  }, [callStatus, router, type, userId]);

  const handleCall = async () => {
    setCallStatus("CONNECTING");

    if (type === "generate") {
      await vapi.start(undefined, undefined, undefined, process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username,
          userid: userId,
        },
      });
    } else {
      // let formattedQuestions = "";
      // if (questions) {
      //   formattedQuestions = questions
      //     .map((question) => `- ${question}`)
      //     .join("\n");
      // }
      // await vapi.start(interviewer, {
      //   variableValues: {
      //     questions: formattedQuestions,
      //   },
      // });
    }
  };

  const handleDisconnect = () => {
    setCallStatus("FINISHED");
    vapi.stop();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Agent
          type="generate"
          username="AI Inverviewer"
          variant="alternative"
          avatar="/ai-avatar.webp"
          isSpeaking={isSpeaking}
        />
        <Agent username={username} avatar="/user-avatar.jpg" className="hidden md:block" />
      </div>

      {messages.length > 0 && <Message message={lastMessage!} />}

      <div className="w-full flex justify-center">
        <CallButton
          callStatus={callStatus}
          handleCall={handleCall}
          handleDisconnect={handleDisconnect}
        />
      </div>
    </>
  );
};
