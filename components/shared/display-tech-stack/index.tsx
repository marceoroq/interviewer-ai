import Image from "next/image";
import { cn, getDevIconUrl } from "@/lib/utils";

export const DisplayTechStack = ({
  className,
  techstack,
}: {
  className?: string;
  techstack: string[];
}) => {
  return (
    <div className={cn("flex", className)}>
      {techstack.map((tech) => (
        <div className="group rounded-full relative -ml-2 first:ml-0" key={tech}>
          <Image
            className="bg-[#1A1C2A] group border border-[#242633] aspect-square rounded-full p-2 -ml-1 first:ml-0"
            width={40}
            height={40}
            src={getDevIconUrl(tech) || "/tech.svg"}
            alt={tech}
          />
          <span className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md">
            {tech}
          </span>
        </div>
      ))}
    </div>
  );
};
