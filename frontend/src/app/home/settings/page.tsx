import SettingsDashboard from "@/src/components/settings/settings-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Task Manager and Cloud Storage System",
  description: "Settings page",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-2 sm:p-6 md:p-8">
      <div className="flex-1 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="sm:flex-row sm:space-x-0.5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Settings
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground sm:mt-0">
            Manage your account settings and preferences
          </p>
          <SettingsDashboard />
        </div>
      </div>
    </div>
  );
}
