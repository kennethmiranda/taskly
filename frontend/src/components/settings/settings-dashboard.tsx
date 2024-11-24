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
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    emailNotifications: false,
    customAvatar: null as string | null,
    selectedFile: null as File | null,
    previewAvatar: null as string | null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const displayAvatar =
    formData.previewAvatar ||
    formData.customAvatar ||
    session?.user?.image ||
    "/profile-placeholder.png";

  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.user?.email) {
        setIsPageLoading(false);
        return;
      }

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
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          emailNotifications: data.emailNotifications || false,
          customAvatar: data.avatar || null,
        }));
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error",
          description: "Failed to load profile settings",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsPageLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchSettings();
    } else if (status === "unauthenticated") {
      setIsPageLoading(false);
    }
  }, [session, status]);

  const uploadAvatar = async (file: File) => {
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
      return data.avatar;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let newAvatarUrl = formData.customAvatar;

      if (formData.selectedFile) {
        newAvatarUrl = await uploadAvatar(formData.selectedFile);
      }

      const response = await fetch("http://localhost:3002/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          email: session?.user?.email || "",
        },
        body: JSON.stringify({
          name: formData.name,
          emailNotifications: formData.emailNotifications,
          avatar: newAvatarUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // update session data and state
      await updateSession({
        user: {
          ...session?.user,
          name: formData.name,
          image: newAvatarUrl,
        },
      });

      setFormData((prev) => ({
        ...prev,
        customAvatar: newAvatarUrl,
        selectedFile: null,
      }));

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      selectedFile: file,
      previewAvatar: previewUrl,
    }));
  };

  if (isPageLoading) {
    return (
      <div className="flex w-full h-[400px] items-center justify-center">
        <IconLoader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex w-full py-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter name"
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
              <AvatarImage src={displayAvatar} alt="Profile picture" />
              <AvatarFallback>
                {formData.name
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
            checked={formData.emailNotifications}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, emailNotifications: checked }))
            }
          />
        </div>

        <div className="relative md:flex items-center space-x-2">
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
