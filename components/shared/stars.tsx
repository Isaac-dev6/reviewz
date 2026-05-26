import { cn } from "@/lib/utils";

export function Stars({
  value = 5,
  size = 14,
  className,
}: {
  value?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex gap-px text-amber-500", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= value ? "currentColor" : "none"}
          stroke={i <= value ? "currentColor" : "#CBD5E1"}
          strokeWidth="1.6"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}
