import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { featured?: boolean; soft?: boolean }
>(({ className, featured, soft, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-white text-slate-900",
      soft && "bg-slate-50 border-slate-100",
      featured &&
        "border-amber-500 border-2 shadow-[0_0_0_4px_rgba(245,158,11,0.08),0_4px_12px_-2px_rgba(15,23,42,0.08),0_2px_6px_-1px_rgba(15,23,42,0.04)]",
      !featured && !soft && "border-slate-200",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";
