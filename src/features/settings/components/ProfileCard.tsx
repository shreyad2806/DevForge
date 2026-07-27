"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

import { userProfile } from "@/data/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  children: React.ReactNode;
  hint?: string;
}

function Field({ label, children, hint }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="text-[10px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function ProfileCard() {
  const [profile, setProfile] = useState(userProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      const email = auth.user?.email ?? "";
      const emailPrefix = email.split("@")[0] ?? "user";

      let loaded = {
        ...userProfile,
        email,
        fullName: emailPrefix,
        username: emailPrefix,
        avatarAlt: emailPrefix,
      };

      if (auth.user) {
        const { data } = await supabase
          .from("profiles")
          .select("name, bio, avatar_url")
          .eq("id", auth.user.id)
          .maybeSingle();

        if (data && !cancelled) {
          loaded = {
            ...loaded,
            fullName: data.name ? String(data.name) : loaded.fullName,
            bio: data.bio ? String(data.bio) : loaded.bio,
            avatarUrl: data.avatar_url ? String(data.avatar_url) : loaded.avatarUrl,
            avatarAlt: data.name ? String(data.name) : loaded.avatarAlt,
          };
        }
      }

      if (!cancelled) {
        setProfile(loaded);
        setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <FadeInView direction="up" distance={16} duration={0.4}>
      <HoverCard scale={1.005} y={-2}>
        <div className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
          <h2 className="text-sm font-semibold text-foreground">Profile Information</h2>
          {loading && (
            <p className="mt-3 text-xs text-muted-foreground">Loading profile...</p>
          )}

          <div className="mt-5 flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-col items-center gap-2 lg:w-40">
              <div className="relative">
                <img
                  src={profile.avatarUrl}
                  alt={profile.avatarAlt}
                  className="size-24 rounded-full border-2 border-border/60 bg-muted object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border border-border/60 bg-card text-foreground shadow-sm"
                  aria-label="Change avatar"
                >
                  <Camera className="size-3.5" aria-hidden="true" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
            </div>

            <div className="grid flex-1 gap-5 sm:grid-cols-2">
              <Field label="Full Name">
                <Input
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, fullName: e.target.value }))
                  }
                  className="h-10 rounded-xl border-border/60 bg-background"
                />
              </Field>

              <Field label="Username" hint="This is your public display name.">
                <Input
                  value={profile.username}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, username: e.target.value }))
                  }
                  className="h-10 rounded-xl border-border/60 bg-background"
                />
              </Field>

              <Field label="Email Address" hint="We'll never share your email with anyone else.">
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, email: e.target.value }))
                  }
                  className="h-10 rounded-xl border-border/60 bg-background"
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Bio">
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, bio: e.target.value }))
                    }
                    rows={4}
                    maxLength={160}
                    className={cn(
                      "w-full rounded-xl border border-border/60 bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary",
                      "resize-none"
                    )}
                  />
                  <p className="text-right text-[10px] text-muted-foreground">
                    {profile.bio.length}/160
                  </p>
                </Field>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button className="rounded-lg">Save Changes</Button>
          </div>
        </div>
      </HoverCard>
    </FadeInView>
  );
}
