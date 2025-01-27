import SettingsDashboard from "@/src/components/settings/settings-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Taskly",
  description: "Settings page",
};

export default function SettingsPage() {
  return <SettingsDashboard />;
}
