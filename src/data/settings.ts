export interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  avatarAlt: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  showNavigationTooltips: boolean;
  autoUpdateKits: boolean;
  enableAnalytics: boolean;
}

export interface ConnectedAccount {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  email?: string;
  description?: string;
  connected: boolean;
}

export const userProfile: UserProfile = {
  fullName: "Shreya Dubey",
  username: "shreya.dev",
  email: "shreya.dubey@example.com",
  bio: "Building developer tools that simplify and accelerate development.",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shreya",
  avatarAlt: "Shreya Dubey avatar",
};

export const userPreferences: UserPreferences = {
  language: "English",
  timezone: "(GMT+5:30) Asia/Kolkata",
  dateFormat: "DD MMM, YYYY",
  timeFormat: "12 Hour",
  showNavigationTooltips: true,
  autoUpdateKits: false,
  enableAnalytics: true,
};

export const connectedAccounts: ConnectedAccount[] = [
  {
    id: "github",
    name: "GitHub",
    icon: "Github",
    iconColor: "text-foreground",
    email: "shreya.dubey@github.com",
    connected: true,
  },
  {
    id: "google",
    name: "Google",
    icon: "Chrome",
    iconColor: "text-red-400",
    email: "shreya.dubey@gmail.com",
    connected: true,
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "Triangle",
    iconColor: "text-foreground",
    email: "shreya-dev.vercel.app",
    description: "shreya-dev.vercel.app",
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    icon: "Slack",
    iconColor: "text-purple-400",
    description: "Connect your workspace",
    connected: false,
  },
];

export const settingsMenu = [
  { id: "profile", label: "Profile", description: "Manage your personal information", icon: "User" },
  { id: "account", label: "Account", description: "Email, password and security", icon: "Shield" },
  { id: "appearance", label: "Appearance", description: "Theme, language and region", icon: "Palette" },
  { id: "notifications", label: "Notifications", description: "Email and in-app notifications", icon: "Bell" },
  { id: "integrations", label: "Integrations", description: "Connect third-party services", icon: "Plug" },
  { id: "api-keys", label: "API Keys", description: "Manage your API keys", icon: "Key" },
  { id: "team", label: "Team", description: "Manage team and permissions", icon: "Users" },
];
