import { siteSettings } from "@/data/site-settings";

function getTimeRemaining() {
  const remaining = Math.max(0, new Date(siteSettings.registrationDeadline).getTime() - Date.now());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining % 86_400_000) / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1_000),
  };
}

export function RegistrationCounter() {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    if (!siteSettings.showCountdown) return;
    const timer = window.setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const isClosed = Object.values(time).every((value) => value === 0);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-stretch">
      <div className="border-y border-border py-8 sm:py-10">
        <p className="eyebrow text-primary">A WORLD OF PEOPLE, ONE SHARED PURPOSE</p>
        <p className="mt-4 font-display text-5xl font-extrabold text-foreground sm:text-7xl">{siteSettings.joinedCountDisplay}</p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">A global-scale vision for people to find a room, share experience and show up for one another.</p>
      </div>
      <div className="border-y border-primary/50 bg-card px-6 py-8 sm:px-8 sm:py-10 lg:min-w-[370px]">
        <p className="eyebrow text-primary">{isClosed ? "REGISTRATION CLOSED" : siteSettings.countdownText}</p>
        {siteSettings.showCountdown && !isClosed ? (
          <div className="mt-5 grid grid-cols-4 gap-3" aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}>
            {([["DAYS", time.days], ["HOURS", time.hours], ["MINUTES", time.minutes], ["SECONDS", time.seconds]] as const).map(([label, value]) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl font-bold tabular-nums text-foreground">{String(value).padStart(2, "0")}</p>
                <p className="mt-2 text-[9px] font-semibold tracking-wider text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        ) : <p className="mt-5 font-display text-2xl font-bold text-foreground">Registration is closed.</p>}
        <p className="mt-5 text-xs text-muted-foreground">Closes 15 October 2026</p>
      </div>
    </div>
  );
}
