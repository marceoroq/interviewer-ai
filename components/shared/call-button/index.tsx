import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CallStatus } from "@/types";

interface CallButtonProps {
  callStatus: CallStatus;
  handleCall: () => Promise<void>;
  handleDisconnect: () => void;
}

export const CallButton = ({ callStatus, handleCall, handleDisconnect }: CallButtonProps) => {
  const isCallInactiveOrFinished = callStatus === "INACTIVE" || callStatus === "FINISHED";

  return callStatus !== "ACTIVE" ? (
    <Button variant="default-call" className="relative" onClick={() => handleCall()}>
      <span
        className={cn(
          "absolute animate-ping rounded-full opacity-75",
          callStatus !== "CONNECTING" && "hidden"
        )}
      />

      <span className="relative">{isCallInactiveOrFinished ? "Call" : ". . ."}</span>
    </Button>
  ) : (
    <Button variant="destructive-call" onClick={() => handleDisconnect()}>
      <span>End</span>
    </Button>
  );
};
