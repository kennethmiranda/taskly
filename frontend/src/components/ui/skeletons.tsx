import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

export function TaskDashboardSkeleton() {
  return (
    <div className="space-y-6 p-2 sm:p-6 md:p-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-[120px]" /> {/* Tasks */}
        <Skeleton className="h-5 w-[180px]" /> {/* Here's a list... */}
      </div>

      {/* Command Bar */}
      <div className="flex gap-2 items-center">
        <Skeleton className="h-9 w-[100px]" /> {/* Create Task button */}
        <Skeleton className="h-9 w-[300px]" /> {/* Search input */}
        <div className="flex gap-2 mr-auto">
          <Skeleton className="h-9 w-[100px]" /> {/* Status filter */}
          <Skeleton className="h-9 w-[100px]" /> {/* Priority filter */}
        </div>
      </div>

      {/* Table Header */}
      <div className="rounded-md border">
        <div className="border-b p-3">
          <div className="grid grid-cols-7 gap-3 items-center">
            <Skeleton className="flex h-4 w-[20px]" /> {/* Checkbox */}
            <Skeleton className="flex -ml-36 h-4 w-[50px]" /> {/* Task */}
            <Skeleton className="flex -ml-20 h-4 w-[50px]" /> {/* Title */}
            <Skeleton className="flex h-4 w-[50px]" /> {/* Due Date */}
            <Skeleton className="flex ml-6 h-4 w-[50px]" /> {/* Status */}
            <Skeleton className="flex ml-28 h-4 w-[50px]" /> {/* Priority */}
            <Skeleton className="flex ml-28 h-4 w-[20px]" /> {/* Actions */}
          </div>
        </div>

        {/* Table Rows */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="border-b p-4">
            <div className="grid grid-cols-7 gap-4 items-center">
              <Skeleton className="h-4 w-[20px]" /> {/* Checkbox */}
              <Skeleton className="-ml-36 h-4 w-[50px]" /> {/* Task */}
              <Skeleton className="-ml-20 h-4 w-[50px]" /> {/* Title */}
              <Skeleton className="h-4 w-[50px]" /> {/* Due Date */}
              <Skeleton className="h-4 ml-6 w-[50px]" /> {/* Status */}
              <Skeleton className="h-4 ml-28 w-[50px]" /> {/* Priority */}
              <Skeleton className="h-4 ml-28 w-[20px]" /> {/* Actions */}
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className="-mt-1 flex items-center justify-between">
        <Skeleton className="h-4 w-[200px]" /> {/* Selected items count */}
        <div className="flex gap-2 items-center">
          <Skeleton className="h-8 w-[100px]" /> {/* Items per page */}
          <Skeleton className="h-8 w-[100px]" /> {/* Page numbers */}
          <div className="flex gap-2 px-5">
            <Skeleton className="h-8 w-[100px]" /> {/* Page numbers */}
          </div>
          <div className="flex gap-1">
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

export function EditTaskSkeleton() {}

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
