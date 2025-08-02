import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/constants";
import Image from "next/image";

export const AuthForm = () => {
  return (
    <Card className="w-full max-w-sm h-[400px]">
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="flex items-center justify-center gap-2">
          <Image src="/logo.svg" width={38} height={32} alt="app logo" />
          <h2>{APP_NAME}</h2>
        </CardTitle>
        <CardDescription>Practice job interview with AI</CardDescription>
      </CardHeader>
    </Card>
  );
};
