import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

export function TasksSkeleton() {
  return (
    <div className="space-y-5 p-2 sm:p-6 md:p-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-[100px]" /> {/* Tasks */}
        <Skeleton className="h-5 w-[185px]" /> {/* h2 */}
      </div>

      {/* Command Bar */}
      <div className="flex gap-2 items-center">
        <Skeleton className="h-7 w-[118px]" /> {/* Create Task button */}
        <Skeleton className="h-7 w-[250px]" /> {/* Search input */}
        <div className="flex gap-2 mr-auto">
          <Skeleton className="h-7 w-[88px]" /> {/* Status filter */}
          <Skeleton className="h-7 w-[88px]" /> {/* Priority filter */}
        </div>
      </div>

      {/* Table Header */}
      <div className="rounded-md border">
        <div className="border-b p-2.5">
          <div className="grid grid-cols-7 gap-2 items-center">
            <Skeleton className="flex -ml-1 h-5 w-[20px]" /> {/* Checkbox */}
            <Skeleton className="flex -ml-40 h-5 w-[45px]" /> {/* Task */}
            <Skeleton className="flex -ml-24 h-5 w-[50px]" /> {/* Title */}
            <Skeleton className="flex h-5 -ml-2 w-[70px]" /> {/* Due Date */}
            <Skeleton className="flex ml-8 h-5 w-[60px]" /> {/* Status */}
            <Skeleton className="flex ml-24 h-5 w-[70px]" /> {/* Priority */}
            <Skeleton className="flex ml-28 h-5 w-[20px]" /> {/* Actions */}
          </div>
        </div>

        {/* Table Rows */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="border-b p-4">
            <div className="grid grid-cols-7 items-center">
              <Skeleton className="flex h-4 -ml-2 w-[20px]" /> {/* Checkbox */}
              <Skeleton className="flex -ml-40 h-4 w-[120px]" /> {/* Task */}
              <Skeleton className="-ml-24 h-4 w-[90px]" /> {/* Title */}
              <Skeleton className="h-4 -ml-1 w-[90px]" /> {/* Due Date */}
              <Skeleton className="h-4 ml-10 w-[86px]" /> {/* Status */}
              <Skeleton className="h-4 ml-28 w-[70px]" /> {/* Priority */}
              <Skeleton className="h-4 ml-32 w-[20px]" /> {/* Actions */}
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className="-p-1 flex items-center justify-between">
        <Skeleton className="h-6 w-[175px]" /> {/* Selected items count */}
        <div className="flex gap-6 items-center">
          <Skeleton className="h-8 w-[230px]" /> {/* Tasks per page */}
          <div className="flex gap-2 px-5">
            <Skeleton className="h-8 w-[85px]" /> {/* Page numbers */}
          </div>
          <div className="flex gap-2 -ml-4">
            <Skeleton className="h-8 w-8" /> {/* First page */}
            <Skeleton className="h-8 w-8" /> {/* Prev page */}
            <Skeleton className="h-8 w-8" /> {/* Next page */}
            <Skeleton className="h-8 w-8" /> {/* Last page */}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="space-y-6 p-2 sm:p-6 md:p-8">
      <div className="flex-1 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        {/* Header Section */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-[120px] sm:h-9" /> {/* Settings */}
          <Skeleton className="h-6 w-[350px]" /> {/* Description */}
        </div>

        <div className="flex w-full py-10">
          <div className="space-y-8 w-full max-w-xl">
            {/* Name field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-10 w-[340px]" />
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-10 w-[340px]" />
            </div>

            {/* Profile Picture section */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="h-10 w-[250px]" />
              </div>
            </div>

            {/* Email Notifications toggle */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-6 w-11 rounded-full" />
            </div>

            {/* Theme toggle */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>

            {/* Save button */}
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="space-y-6 p-2 sm:p-6 md:p-8">
      <div className="flex-1 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="sm:flex-row sm:space-x-0.5">
          {/* Header and Streak */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-8 w-[135px] sm:h-11" /> {/* Calendar */}
            <Skeleton className="h-5 w-[140px]" /> {/* Streak */}
          </div>

          {/* Calendar Container */}
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="mx-auto h-8 w-[180px]" /> {/* Month/Year */}
            <div className="flex space-x-2 px-2">
              <Skeleton className="h-9 w-28" /> {/* Navigation */}
              <Skeleton className="h-9 w-28" />
            </div>
          </div>

          <div className="calendar-skeleton w-full border rounded-lg p-4 space-y-4">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Week Headers */}
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={`header-${i}`} className="w-[205px] -mt-4 h-5" />
              ))}

              {/* Calendar Days */}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={`day-${i}`} className="aspect-square p-1">
                  <div className="w-full h-full relative">
                    <Skeleton className="ml-auto h-6 w-6 mb-1" />{" "}
                    {/* Day number */}
                    {/* Random event indicators */}
                    {Math.random() > 0.7 && (
                      <Skeleton className="h-5 w-full mt-1" />
                    )}
                    {Math.random() > 0.8 && (
                      <Skeleton className="h-5 w-full mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditTaskSkeleton() {
  return (
    <div className="container w-full mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-24" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-52" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-16">
          {/* Description Section */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="w-full h-[100px] md:h-[200px] overflow-y-auto rounded-lg 2xl:w-[600px] p-4" />

            {/* Task Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-24 mb-2" />
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
              <Skeleton className="w-full h-[200px] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SideNavSkeleton() {
  return (
    <div className="flex h-screen flex-col gap-2">
      {/* Mobile toggle */}
      <div className="block md:hidden px-4 py-2">
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Logo */}
      <div className="px-4 py-2">
        <Skeleton className="h-8 w-32" />
      </div>

      {/* User profile */}
      <div className="flex flex-col items-center gap-2 border-b border-border p-6">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Navigation links */}
      <div className="flex-1 px-4 space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-lg" />
        ))}
      </div>

      {/* Sign out button */}
      <div className="p-4">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
