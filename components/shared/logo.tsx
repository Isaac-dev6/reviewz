import { cn } from "@/lib/utils";

export function Logo({
  size = "md",
  dark = false,
  className,
}: {
  size?: "sm" | "md";
  dark?: boolean;
  className?: string;
}) {
  const markSize = size === "sm" ? 22 : 26;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-bold tracking-tight",
        size === "sm" ? "text-[14px]" : "text-[15px]",
        dark ? "text-white" : "text-slate-900",
        className,
      )}
    >
      <span
        className="rounded-[7px] bg-amber-500 inline-flex items-center justify-center text-white font-extrabold shadow-[0_2px_6px_rgba(245,158,11,0.35),0_1px_0_rgba(255,255,255,0.3)_inset]"
        style={{ width: markSize, height: markSize }}
      >
        <svg
          width={Math.round(markSize * 0.55)}
          height={Math.round(markSize * 0.55)}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 4h9a5 5 0 0 1 1.8 9.65L20 20h-4.5l-3.8-6H10v6H6V4z"
            fill="#fff"
          />
        </svg>
      </span>
      Reviewz
    </span>
  );
}
