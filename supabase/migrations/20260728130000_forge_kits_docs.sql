ALTER TABLE public.forge_kits
  ADD COLUMN IF NOT EXISTS overview text,
  ADD COLUMN IF NOT EXISTS installation text,
  ADD COLUMN IF NOT EXISTS "usage" text,
  ADD COLUMN IF NOT EXISTS api_reference text,
  ADD COLUMN IF NOT EXISTS example_code text,
  ADD COLUMN IF NOT EXISTS files jsonb DEFAULT '[]'::jsonb;
