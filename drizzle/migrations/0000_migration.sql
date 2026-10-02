CREATE TABLE public.interest_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL UNIQUE CHECK (char_length(email) BETWEEN 3 AND 255),
  room_interest text CHECK (room_interest IS NULL OR char_length(room_interest) <= 120),
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.interest_registrations TO anon, authenticated;
GRANT ALL ON public.interest_registrations TO service_role;
ALTER TABLE public.interest_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register interest" ON public.interest_registrations
  FOR INSERT TO anon, authenticated WITH CHECK (consent = true);

CREATE OR REPLACE FUNCTION public.interest_count()
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT count(*)::int FROM public.interest_registrations $$;
GRANT EXECUTE ON FUNCTION public.interest_count() TO anon, authenticated;