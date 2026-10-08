import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { siteSettings } from "@/data/site-settings";

// Loose client so this works even if the generated Supabase types don't know the new tables yet.
const db = supabase as any;

export type SiteSettingsRow = {
  registration_deadline: string;
  show_countdown: boolean;
  countdown_text: string;
  count_offset: number;
  use_real_count: boolean;
  hero_eyebrow: string;
  hero_headline: string;
  hero_highlight: string;
  hero_subtext: string;
  payment_html: string;
};

// Used until the database answers (and if it ever fails).
export const defaultSettings: SiteSettingsRow = {
  registration_deadline: String(siteSettings.registrationDeadline),
  show_countdown: Boolean(siteSettings.showCountdown),
  countdown_text: String(siteSettings.countdownText),
  count_offset: 0,
  use_real_count: true,
  hero_eyebrow: "ONE WORLD. COUNTLESS EXPERIENCES. PEOPLE WHO SHOW UP.",
  hero_headline: "What if you never had to face a problem",
  hero_highlight: "alone?",
  hero_subtext:
    "Somewhere in the world, someone has faced what you're facing. Someone has learned something you haven't. Someone might know a way forward that you haven't discovered yet.",
  payment_html: "",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsRow>(defaultSettings);
  const [realCount, setRealCount] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await db.from("site_settings").select("*").eq("id", 1).maybeSingle();
        if (alive && data) {
          const clean = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== null));
          setSettings({ ...defaultSettings, ...clean });
        }
        const { data: count } = await db.rpc("get_registration_count");
        if (alive && typeof count === "number") setRealCount(count);
      } catch {
        // keep defaults
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const displayCount = (settings.use_real_count ? realCount : 0) + settings.count_offset;
  return { settings, realCount, displayCount };
}
