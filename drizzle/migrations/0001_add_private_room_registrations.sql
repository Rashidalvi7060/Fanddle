CREATE TABLE public.fanddle_room_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
  age smallint NOT NULL CHECK (age BETWEEN 1 AND 120),
  city text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 120),
  occupation text NOT NULL CHECK (occupation IN ('Student', 'Working Professional', 'Business Owner', 'Freelancer', 'Creator', 'Other')),
  reason text NOT NULL CHECK (char_length(reason) BETWEEN 1 AND 1000),
  room_id text NOT NULL CHECK (char_length(room_id) = 3),
  room_name text NOT NULL CHECK (char_length(room_name) BETWEEN 1 AND 160),
  community_rules_consent boolean NOT NULL DEFAULT false CHECK (community_rules_consent = true),
  registration_status text NOT NULL DEFAULT 'received' CHECK (registration_status IN ('received', 'reviewed', 'accepted', 'rejected')),
  custom_answers jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(custom_answers) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.fanddle_room_registrations TO anon, authenticated;
GRANT ALL ON public.fanddle_room_registrations TO service_role;
ALTER TABLE public.fanddle_room_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit room registrations" ON public.fanddle_room_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (community_rules_consent = true);