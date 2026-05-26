import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 h-[22px] rounded-full text-[12px] font-medium leading-none",
  {
    variants: {
      variant: {
        neutral: "bg-slate-100 text-slate-700",
        outline: "bg-white text-slate-700 border border-slate-200",
        amber: "bg-amber-100 text-amber-700",
        amberSolid: "bg-amber-500 text-white",
        green: "bg-green-100 text-green-700",
        red: "bg-red-100 text-red-700",
        dark: "bg-slate-900 text-white",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  dot?: boolean;
}

export function Chip({ className, variant, dot, children, ...props }: ChipProps) {
  const dotColor =
    variant === "green"
      ? "bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.18)]"
      : variant === "red"
        ? "bg-red-500"
        : variant === "amber"
          ? "bg-amber-500"
          : "bg-current";
  return (
    <span className={cn(chipVariants({ variant }), className)} {...props}>
      {dot ? <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)} /> : null}
      {children}
    </span>
  );
}
