import * as React from "react";

import { cn } from "@/lib/utils";

const variantBackgroundClasses = {
  default: "bg-linear-to-t from-[#08090D] to-[#1A1C20]",
  alternative: "bg-linear-to-t from-[#0C0B16] to-[#181537]",
};

const variantBorderClasses = {
  default: "bg-linear-to-b from-[#4B4D4F] to-[#4B4D4F33]",
  alternative: "bg-linear-to-b from-[#4B4D4F] to-[#4B4D4F33]",
};

function Card({
  className,
  internalClassName,
  variant = "alternative",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: keyof typeof variantBackgroundClasses;
  internalClassName?: string;
}) {
  return (
    <div
      data-slot="card"
      className={cn("w-full p-0.5 rounded-2xl shadow-sm", variantBorderClasses[variant], className)}
      {...props}
    >
      <div
        className={cn(
          "overflow-hidden h-full flex flex-col gap-6 rounded-xl border-0 py-6 bg-linear-to-t text-card-foreground",
          internalClassName,
          variantBackgroundClasses[variant]
        )}
      >
        {children}
      </div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
