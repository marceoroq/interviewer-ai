import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CallStatus } from "@/types";

export const CallButton = ({ callStatus }: { callStatus: CallStatus }) => {
  return callStatus !== "ACTIVE" ? (
    <Button variant="default-call" className="relative">
      <span
        className={cn(
          "absolute animate-ping rounded-full opacity-75",
          callStatus !== "CONNECTING" && "hidden"
        )}
      />

      <span className="relative">
        {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : ". . ."}
      </span>
    </Button>
  ) : (
    <Button variant="destructive-call">
      <span>End</span>
    </Button>
  );
};
