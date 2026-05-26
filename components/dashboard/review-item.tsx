import { Sparkles } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/shared/stars";
import { Avatar } from "@/components/shared/avatar";

export interface ReviewItemProps {
  avatar: { initials: string; bg: string };
  name: string;
  rating: number;
  text: string;
  when: string;
  critical?: boolean;
  aiReply?: string;
  draft?: boolean;
  status?: "auto" | "draft";
}

export function ReviewItem({
  avatar,
  name,
  rating,
  text,
  when,
  critical,
  aiReply,
  draft,
  status,
}: ReviewItemProps) {
  return (
    <div className="px-5 py-[18px] border-b border-slate-200 bg-white">
      <div className="flex gap-3 items-start">
        <Avatar {...avatar} size={36} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-semibold text-slate-900">{name}</span>
            <Stars value={rating} size={13} />
            {critical && (
              <Chip variant="red" dot>
                Critique
              </Chip>
            )}
            {status === "auto" && (
              <Chip variant="green" dot>
                Auto-publié
              </Chip>
            )}
            {status === "draft" && (
              <Chip variant="amber" dot>
                Brouillon
              </Chip>
            )}
            <span className="ml-auto text-xs text-slate-500">{when}</span>
          </div>
          <p className="mt-1.5 text-[13.5px] text-slate-700 leading-relaxed">{text}</p>
          {aiReply && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 pt-2.5 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="size-4 rounded bg-amber-500 inline-flex items-center justify-center">
                  <Sparkles className="size-[10px] text-white" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.06em] text-amber-700 uppercase">
                  {draft ? "Brouillon · à valider" : "Réponse publiée par l'IA"}
                </span>
                {!draft && (
                  <span className="ml-auto text-[11px] text-amber-700/70">{when}</span>
                )}
              </div>
              <p className="text-[13px] text-slate-700 leading-relaxed">{aiReply}</p>
              {draft && (
                <div className="flex gap-1.5 mt-2.5">
                  <Button size="sm">Publier</Button>
                  <Button size="sm" variant="ghost">
                    Modifier
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
