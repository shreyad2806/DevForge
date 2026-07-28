ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now() NOT NULL;

ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now() NOT NULL;
