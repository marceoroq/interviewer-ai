import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Message = ({ message }: { message: string }) => {
  return (
    <Card className="w-full" internalClassName="py-4 px-4">
      <CardContent className="py-0 flex justify-center">
        <p
          className={cn("transition-opacity duration-500 opacity-0", "animate-fadeIn opacity-100")}
        >
          {message}
        </p>
      </CardContent>
    </Card>
  );
};
