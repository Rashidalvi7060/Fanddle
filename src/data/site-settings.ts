export const siteSettings = {
  joinedCount: 100_000,
  registrationStatus: "OPEN" as const,
  registrationDeadline: "2026-10-15T23:59:59+05:30",
  showCountdown: true,
  countdownText: "Registrations are open until 15 October.",
};

export const registrationFields = [
  { key: "name", label: "Full Name", type: "text", required: true, maxLength: 100 },
  { key: "email", label: "Email Address", type: "email", required: true, maxLength: 255 },
  { key: "phone", label: "Mobile Number", type: "tel", required: true, maxLength: 30 },
  { key: "age", label: "Age", type: "number", required: true, min: 1, max: 120 },
  { key: "city", label: "City", type: "text", required: true, maxLength: 120 },
  {
    key: "occupation",
    label: "What best describes you?",
    type: "select",
    required: true,
    options: ["Student", "Working Professional", "Business Owner", "Freelancer", "Creator", "Other"],
  },
  { key: "reason", label: "Why do you want to join this room?", type: "textarea", required: true, maxLength: 1000 },
] as const;