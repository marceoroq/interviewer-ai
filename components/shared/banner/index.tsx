import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-b from-[#171532] to-[#08090D] rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4">
      <div className="flex flex-col gap-6 lg:max-w-lg">
        <h2 className="text-3xl font-semibold">
          Get Interview-Ready with AI-Powered Practice & Feedback
        </h2>
        <p className="text-lg text-accent-foreground">
          Practice on real interview questions and get feedback from AI
        </p>
        <Button className="w-full md:w-fit cursor-pointer" asChild>
          <Link href="/interview">Start an Interview</Link>
        </Button>
      </div>
      <Image
        src="/robot.png"
        alt="robot image"
        width={442}
        height={290}
        className="max-sm:hidden w-56 lg:w-96"
      />
    </div>
  );
};
