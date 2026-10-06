# FANDDLE room registration update

## Build
- Keep the existing FANDDLE visual identity while updating navigation, homepage registration information, and room cards/details.
- Add the configurable 100,000+ display counter and 15 October 2026 countdown; remove public per-room counts and inaccurate capacity/availability messaging.
- Create one shared registration dialog, opened from JOIN NOW and JOIN THIS ROOM, with the requested fields, community-rules consent, room context, and confirmation state.
- Make each room detail page explain its topic-specific value using the selected room's existing data.

## Technical details
- Add an additive, private room-registration table with row-level security allowing public submissions only; do not expose registration records for public reads.
- Keep homepage display settings and registration form definitions in data-driven configuration for future administration.
- Preserve existing routes and the existing interest-registration flow unless replaced by the new shared room registration experience.

## Validation
- Check room-directory and room-detail navigation, shared dialog submission states, countdown behavior, responsive layout, project diagnostics, and migration grants/policies.