import {
  BarChart3,
  Cog,
  Home,
  Inbox,
  Plug,
  Send,
  Store,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Avatar } from "@/components/shared/avatar";
import { cn } from "@/lib/utils";

const items = [
  { icon: Home, label: "Vue d'ensemble", href: "/dashboard", id: "inbox" },
  { icon: Inbox, label: "Avis", href: "/dashboard", id: "reviews", badge: "2" },
  { icon: Send, label: "Réponses", href: "/dashboard", id: "replies" },
  { icon: BarChart3, label: "Statistiques", href: "/dashboard", id: "stats" },
];

const config = [
  { icon: Store, label: "Établissement", href: "/settings", id: "place" },
  { icon: Plug, label: "Intégrations", href: "/settings", id: "integrations" },
];

export function Sidebar({ active = "inbox" }: { active?: string }) {
  return (
    <aside className="w-[220px] bg-slate-50 border-r border-slate-200 p-3 flex flex-col flex-shrink-0">
      <div className="px-2 pt-1 pb-4">
        <Logo size="sm" />
      </div>

      <SidebarLabel>Pilotage</SidebarLabel>
      <div className="flex flex-col gap-0.5">
        {items.map((it) => (
          <NavItem
            key={it.id}
            href={it.href}
            icon={it.icon}
            label={it.label}
            badge={it.badge}
            active={active === it.id}
          />
        ))}
      </div>

      <SidebarLabel className="mt-3.5">Configuration</SidebarLabel>
      <div className="flex flex-col gap-0.5">
        {config.map((it) => (
          <NavItem
            key={it.id}
            href={it.href}
            icon={it.icon}
            label={it.label}
            active={active === it.id}
          />
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <NavItem
          href="/settings"
          icon={Cog}
          label="Paramètres"
          active={active === "settings"}
        />
        <div className="mt-2.5 px-2 py-2.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2.5">
          <Avatar initials="MC" size={30} bg="#F59E0B" color="#fff" />
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-semibold text-slate-900 truncate">
              Marie Castaing
            </div>
            <div className="text-[11px] text-slate-500">Plan Business</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400 px-2.5 pt-2 pb-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  badge,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] transition-colors",
        active
          ? "bg-white text-slate-900 font-semibold shadow-xs border border-slate-200"
          : "text-slate-500 font-medium border border-transparent hover:text-slate-900",
      )}
    >
      <Icon className="size-[15px]" strokeWidth={active ? 2.2 : 1.8} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="bg-amber-500 text-white text-[10px] font-bold rounded-[10px] px-1.5 min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </Link>
  );
}
