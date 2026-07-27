"use client";

import { useState } from "react";
import { FadeInView } from "@/components/motion/FadeInView";
import { SettingsSidebar } from "@/features/settings/components/SettingsSidebar";
import { ProfileCard } from "@/features/settings/components/ProfileCard";
import { Preferences } from "@/features/settings/components/Preferences";
import { ConnectedAccounts } from "@/features/settings/components/ConnectedAccounts";
import { DangerZone } from "@/features/settings/components/DangerZone";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <FadeInView direction="up" distance={16} duration={0.4}>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Settings
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your account, preferences and application settings.
            </p>
          </div>
        </FadeInView>

        <div className="mt-6 grid gap-6 lg:grid-cols-4">
          <SettingsSidebar
            active={activeSection}
            onSelect={setActiveSection}
            className="h-fit lg:col-span-1"
          />
          <div className="flex flex-col gap-6 lg:col-span-3">
            <ProfileCard />
            <Preferences />
            <ConnectedAccounts />
            <DangerZone />
          </div>
        </div>
      </div>
    </div>
  );
}
