import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { registrationFields, siteSettings } from "@/data/site-settings";
import { rooms, type Room } from "@/data/rooms";

const openRegistrationEvent = "fanddle:open-registration";

export function openRegistrationDialog(room?: Room) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(openRegistrationEvent, { detail: { roomId: room?.id } }),
  );
}

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Enter a valid mobile number").max(30),
  age: z.coerce.number().int("Enter your age in years").min(1).max(120),
  city: z.string().trim().min(1, "Enter your city").max(120),
  occupation: z.enum([
    "Student",
    "Working Professional",
    "Business Owner",
    "Freelancer",
    "Creator",
    "Other",
  ]),
  reason: z.string().trim().min(1, "Tell us why you want to join").max(1000),
  room_id: z.string().length(3),
  community_rules_consent: z.literal(true),
});

type FormValues = {
  name: string;
  email: string;
  phone: string;
  age: string;
  city: string;
  occupation: string;
  reason: string;
};

const emptyForm: FormValues = {
  name: "",
  email: "",
  phone: "",
  age: "",
  city: "",
  occupation: "",
  reason: "",
};

function registrationIsOpen() {
  return siteSettings.registrationStatus === "OPEN" && Date.now() < new Date(siteSettings.registrationDeadline).getTime();
}

export function RoomRegistrationDialog() {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const selectedRoom = rooms.find((room) => room.id === roomId);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ roomId?: string }>).detail;
      setRoomId(detail?.roomId ?? "");
      setValues(emptyForm);
      setConsent(false);
      setError(null);
      setStatus("idle");
      setOpen(true);
    };
    window.addEventListener(openRegistrationEvent, handleOpen);
    return () => window.removeEventListener(openRegistrationEvent, handleOpen);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!registrationIsOpen()) {
      setError("Founding registration is closed.");
      return;
    }
    if (!selectedRoom) {
      setError("Choose a room to continue.");
      return;
    }
    if (!consent) {
      setError("Please agree to the community rules to continue.");
      return;
    }

    const parsed = registrationSchema.safeParse({
      ...values,
      age: values.age,
      room_id: selectedRoom.id,
      community_rules_consent: true,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the details and try again.");
      return;
    }

    setStatus("sending");
    const { error: submitError } = await supabase.from("fanddle_room_registrations").insert({
      ...parsed.data,
      email: parsed.data.email.toLowerCase(),
      room_name: selectedRoom.title,
    });

    if (submitError) {
      setStatus("idle");
      setError("We couldn't save your registration. Please try again.");
      return;
    }
    setStatus("done");
  }

  const fieldClass = "w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto border-border bg-card p-0 sm:max-w-2xl">
        {status === "done" ? (
          <div className="px-6 py-12 text-center sm:px-12">
            <p className="eyebrow text-primary">FANDDLE ROOM REGISTRATION</p>
            <DialogTitle className="mt-5 font-display text-4xl font-extrabold text-foreground">YOU’RE IN.</DialogTitle>
            <DialogDescription className="mx-auto mt-4 max-w-md text-base leading-relaxed">
              Your request to join {selectedRoom?.title ?? "your chosen room"} has been received. We’ll be in touch; this is not yet confirmation of membership.
            </DialogDescription>
            <Button className="mt-8" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <DialogHeader>
              <p className="eyebrow text-primary">FOUNDING ROOM REGISTRATION</p>
              <DialogTitle className="mt-3 font-display text-3xl font-extrabold uppercase text-foreground sm:text-4xl">Choose where you belong.</DialogTitle>
              <DialogDescription className="mt-3 max-w-xl leading-relaxed">
                Tell us a little about yourself and the room you want to join. Your details stay private.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
              <label className="block space-y-2 text-sm font-medium text-foreground">
                Room you want to join
                <select className={fieldClass} value={roomId} onChange={(event) => setRoomId(event.target.value)} required>
                  <option value="">Choose a room</option>
                  {rooms.map((room) => <option key={room.id} value={room.id}>{room.id} · {room.title}</option>)}
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                {registrationFields.map((field) => (
                  <label key={field.key} className={`block space-y-2 text-sm font-medium text-foreground ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>
                    {field.label}
                    {field.type === "select" ? (
                      <select className={fieldClass} value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} required={field.required}>
                        <option value="">Choose one</option>
                        {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea className={`${fieldClass} min-h-28 resize-y`} maxLength={field.maxLength} value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} required={field.required} />
                    ) : (
                      <input className={fieldClass} type={field.type} maxLength={"maxLength" in field ? field.maxLength : undefined} min={"min" in field ? field.min : undefined} max={"max" in field ? field.max : undefined} value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} required={field.required} />
                    )}
                  </label>
                ))}
              </div>

              <label className="flex items-start gap-3 pt-2 text-sm leading-relaxed text-muted-foreground">
                <input type="checkbox" className="mt-1 accent-primary" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                <span>I agree to follow FANDDLE’s community rules and understand that registration is a request, not confirmed membership.</span>
              </label>

              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
              {!registrationIsOpen() && <p className="text-sm text-muted-foreground">Founding registration is closed.</p>}
              <Button type="submit" disabled={status === "sending" || !registrationIsOpen()} className="w-full py-6 font-display font-bold tracking-wider">
                {status === "sending" ? "SENDING…" : "SUBMIT ROOM REGISTRATION →"}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}