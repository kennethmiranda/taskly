import SettingsDashboard from "@/src/components/settings/settings-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Task Manager and Cloud Storage System",
  description: "Settings page",
};

export default function SettingsPage() {
  return <SettingsDashboard />;
}
