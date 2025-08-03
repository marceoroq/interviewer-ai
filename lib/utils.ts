import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techMappings } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const devIconBaseUrl =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{icon}/{icon}-original.svg";

export function getDevIconUrl(icon: string) {
  const normalizedTechName = techMappings[icon.toLowerCase()];
  if (normalizedTechName) return devIconBaseUrl.replaceAll("{icon}", normalizedTechName);
  return null;
}
