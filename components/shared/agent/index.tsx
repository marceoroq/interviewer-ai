import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AgentProps {
  username: string;
  avatar?: string;
  variant?: "default" | "alternative";
  isSpeaking?: boolean;
  className?: string;
}

export const Agent = ({
  username,
  avatar,
  variant = "default",
  isSpeaking = false,
  className,
}: AgentProps) => {
  return (
    <Card className={cn("max-w-lg justify-self-center aspect-3/2", className)} variant={variant}>
      <CardContent className="flex flex-col h-full items-center justify-center gap-6">
        <div className="relative">
          <Avatar className="size-20 sm:size-24 lg:size-28 bg-accent-foreground flex justify-center items-center">
            <AvatarImage src={avatar} alt={username} />
          </Avatar>
          {isSpeaking && (
            <span className="absolute bg-blue-300/50 rounded-full w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22 top-0 left-0 translate-3 animate-ping" />
          )}
        </div>

        <h3 className="font-medium text-xl">{username}</h3>
      </CardContent>
    </Card>
  );
};
