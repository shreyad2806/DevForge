"use client";

import { useState } from "react";

import { userPreferences } from "@/data/settings";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";
import { cn } from "@/lib/utils";

const languages = ["English", "Spanish", "French", "German", "Hindi"];
const timezones = [
  "(GMT-8:00) Pacific Time",
  "(GMT-5:00) Eastern Time",
  "(GMT+0:00) London",
  "(GMT+5:30) Asia/Kolkata",
  "(GMT+9:00) Tokyo",
];
const dateFormats = ["DD MMM, YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
const timeFormats = ["12 Hour", "24 Hour"];

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface SwitchProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Switch({ label, description, checked, onChange }: SwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "size-4 rounded-full bg-white transition-transform",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

export function Preferences() {
  const [prefs, setPrefs] = useState(userPreferences);

  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.05}>
      <HoverCard scale={1.005} y={-2}>
        <div className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
          <h2 className="text-sm font-semibold text-foreground">Preferences</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField
              label="Language"
              value={prefs.language}
              options={languages}
              onChange={(value) => setPrefs((p) => ({ ...p, language: value }))}
            />
            <SelectField
              label="Timezone"
              value={prefs.timezone}
              options={timezones}
              onChange={(value) => setPrefs((p) => ({ ...p, timezone: value }))}
            />
            <SelectField
              label="Date Format"
              value={prefs.dateFormat}
              options={dateFormats}
              onChange={(value) => setPrefs((p) => ({ ...p, dateFormat: value }))}
            />
            <SelectField
              label="Time Format"
              value={prefs.timeFormat}
              options={timeFormats}
              onChange={(value) => setPrefs((p) => ({ ...p, timeFormat: value }))}
            />
          </div>

          <div className="mt-6 space-y-4 border-t border-border/40 pt-5">
            <Switch
              label="Show navigation tooltips"
              description="Display helpful tooltips on hover"
              checked={prefs.showNavigationTooltips}
              onChange={(checked) =>
                setPrefs((p) => ({ ...p, showNavigationTooltips: checked }))
              }
            />
            <Switch
              label="Auto-update kits"
              description="Automatically update kits in your workspaces"
              checked={prefs.autoUpdateKits}
              onChange={(checked) =>
                setPrefs((p) => ({ ...p, autoUpdateKits: checked }))
              }
            />
            <Switch
              label="Enable analytics"
              description="Help us improve DevForge by sharing anonymous usage data"
              checked={prefs.enableAnalytics}
              onChange={(checked) =>
                setPrefs((p) => ({ ...p, enableAnalytics: checked }))
              }
            />
          </div>
        </div>
      </HoverCard>
    </FadeInView>
  );
}
