"use client";

import { useEffect, useState } from "react";
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
import { IconLoader } from "@tabler/icons-react";

export default function SettingsDashboard() {
  const { data: session, status, update: updateSession } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const displayAvatar =
    customAvatar || session?.user?.image || "/profile-placeholder.png";

  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch("http://localhost:3002/api/profile", {
          headers: {
            email: session.user.email,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setName(data.name || "");
        setEmailNotifications(data.emailNotifications || false);
        if (data.avatar) {
          setCustomAvatar(data.avatar);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error",
          description: "Failed to load profile settings",
          variant: "destructive",
          duration: 3000,
        });
      }
    };

    if (status === "authenticated") {
      fetchSettings();
    }
  }, [session, status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3002/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          email: session?.user?.email || "",
        },
        body: JSON.stringify({
          name,
          emailNotifications,
          avatar: customAvatar,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // updates session data
      await updateSession({
        user: {
          ...session?.user,
          name: name,
          image: customAvatar,
        },
      });

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch("http://localhost:3002/api/avatar", {
        method: "POST",
        headers: {
          email: session?.user?.email || "",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }

      const data = await response.json();
      if (data.avatar) {
        setCustomAvatar(data.avatar);
        toast({
          title: "Success",
          description: "Profile picture updated successfully",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Error",
        description: "Failed to upload profile picture",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
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
            placeholder={name}
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
              <AvatarImage
                src={
                  displayAvatar.startsWith("http")
                    ? displayAvatar
                    : displayAvatar
                }
                alt="Profile picture"
              />
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
              disabled={isLoading}
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              Saving...
              <IconLoader className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
}
