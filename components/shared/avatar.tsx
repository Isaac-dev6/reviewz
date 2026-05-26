import { cn } from "@/lib/utils";

interface AvatarProps {
  initials?: string;
  size?: number;
  bg?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Avatar({
  initials,
  size = 32,
  bg = "#475569",
  color = "#ffffff",
  className,
  style,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold flex-shrink-0 border border-slate-200 overflow-hidden",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.38),
        background: bg,
        color,
        ...style,
      }}
    >
      {initials}
    </span>
  );
}

export function AvatarStack({
  avatars,
  size = 28,
}: {
  avatars: { initials: string; bg?: string }[];
  size?: number;
}) {
  return (
    <div className="inline-flex">
      {avatars.map((a, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
          <Avatar
            {...a}
            size={size}
            style={{ boxShadow: "0 0 0 2px #fff" }}
          />
        </div>
      ))}
    </div>
  );
}
