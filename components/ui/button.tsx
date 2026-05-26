import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-amber-500 text-white border border-amber-500 hover:bg-amber-600 hover:border-amber-600",
        dark: "bg-slate-900 text-white hover:bg-slate-800",
        ghost:
          "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
        link: "bg-transparent text-slate-700 hover:text-slate-900 border border-transparent",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 border border-red-500",
      },
      size: {
        sm: "h-8 px-3 text-[13px] rounded-md",
        md: "h-[38px] px-3.5 text-[14px]",
        lg: "h-[46px] px-5 text-[15px]",
        icon: "h-9 w-9 p-0",
      },
      block: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, block }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
