import { cn } from "@/lib/utils";

interface KpiProps {
  label: string;
  value: string;
  delta?: string;
  deltaDir?: "up" | "down" | "flat";
  sub?: string;
  icon?: React.ReactNode;
  tone?: "default" | "danger";
  className?: string;
}

export function KpiCard({
  label,
  value,
  delta,
  deltaDir = "up",
  sub,
  icon,
  tone = "default",
  className,
}: KpiProps) {
  const valueColor = tone === "danger" ? "text-red-700" : "text-slate-900";
  const labelColor = tone === "danger" ? "text-red-700" : "text-slate-500";
  return (
    <div
      className={cn(
        "rounded-xl border p-3.5",
        tone === "danger"
          ? "bg-red-50 border-red-100"
          : "bg-white border-slate-200",
        className,
      )}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.08em]",
            labelColor,
          )}
        >
          {label}
        </span>
        {icon && (
          <div className="size-6 rounded-md bg-slate-50 inline-flex items-center justify-center text-slate-500">
            {icon}
          </div>
        )}
      </div>
      <div
        className={cn(
          "text-[22px] font-bold tracking-[-0.025em] leading-[1.05]",
          valueColor,
        )}
      >
        {value}
      </div>
      {(delta || sub) && (
        <div className="flex items-center gap-1.5 mt-1">
          {delta && (
            <span
              className={cn(
                "text-[11.5px] font-semibold inline-flex items-center gap-0.5",
                deltaDir === "up"
                  ? "text-green-700"
                  : deltaDir === "down"
                    ? "text-red-700"
                    : "text-slate-500",
              )}
            >
              {deltaDir === "up" ? "↑" : deltaDir === "down" ? "↓" : "→"}{" "}
              {delta}
            </span>
          )}
          {sub && <span className="text-[11.5px] text-slate-500">{sub}</span>}
        </div>
      )}
    </div>
  );
}
