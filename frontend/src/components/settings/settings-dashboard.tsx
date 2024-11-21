"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { toast } from "@/src/hooks/use-toast";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";

export default function SettingsDashboard() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(
    session?.user?.image || "/placeholder.svg?height=100&width=100"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          emailNotifications,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await fetch("/api/user/avatar", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload avatar");
        }

        const data = await response.json();
        if (data.image) {
          setAvatarUrl(data.image);
        } else {
          throw new Error("No image URL returned");
        }

        toast({
          title: "Avatar updated",
          description: "Your profile picture has been successfully updated.",
        });
      } catch (error) {
        console.error("Error uploading avatar:", error);
        toast({
          title: "Error",
          description: "Failed to upload avatar. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex w-full py-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={session?.user?.email || ""}
            readOnly
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="avatar">Profile Picture</Label>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} alt="Profile picture" />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="max-w-[250px]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch
            id="email-notifications"
            name="emailNotifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="theme-toggle">Theme Toggle</Label>
          <span>
            <ThemeToggle />
          </span>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
