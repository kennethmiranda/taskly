import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Separator } from "@/src/components/ui/separator";

export function HomeSkeleton() {
  return (
    <div className="space-y-5 p-2 sm:p-6 md:p-8">
      <div className="flex-1 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="sm:flex-row sm:space-x-0.5">
          {/* Header and Streak */}
          <div className="space-y-2 mb-4 sm:mb-2">
            <Skeleton className="h-7 sm:h-9 w-[105px] sm:w-[135px]" />{" "}
            {/* Calendar */}
            <Skeleton className="h-4 sm:h-5 w-[115px] sm:w-[140px]" />{" "}
            {/* Streak */}
          </div>

          {/* Calendar Container */}
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="sm:mx-auto ml-4 h-8 sm:h-8 w-[110px] sm:w-[190px]" />{" "}
            {/* Month/Year */}
            <div className="flex gap-3">
              <Skeleton className="h-9 w-[108px] sm:w-[100px]" />{" "}
              {/* Navigation */}
              <Skeleton className="h-9 w-[120px] sm:w-[110px]" />
            </div>
          </div>

          <div className="calendar-skeleton sm:w-full border rounded-lg p-4">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 h-[595px] gap-1">
              {/* Week Headers */}
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton
                  key={`header-${i}`}
                  className="w-[40px] -mt-3 sm:ml-20 h-5"
                />
              ))}

              {/* Calendar Days */}
              {Array.from({ length: 42 }).map((_, i) => (
                <div key={`day-${i}`} className="w-full h-[90px] p-2">
                  <div className="w-full h-full relative">
                    <Skeleton className="ml-auto h-5 w-5 sm:h-6 sm:w-6 mb-1" />{" "}
                    {/* Day number */}
                    {/* Random event indicators */}
                    {Math.random() > 0.95 && (
                      <Skeleton className="h-5 w-[40px] sm:w-full -ml-2 sm:ml-0  mt-1" />
                    )}
                    {Math.random() > 0.95 && (
                      <Skeleton className="h-5 w-[40px] sm:w-full -ml-2 sm:ml-0 mt-1" />
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

export function SideNavSkeleton() {
  return (
    <div className="w-full md:w-64 hidden sm:block flex-none md:flex-shrink-0">
      <div className="flex h-full flex-col md:bg-transparent">
        {/* Logo Skeleton */}
        <div className="flex mx-7 md:mx-auto p-4 mt-1 md:h-40 items-center justify-center">
          <Skeleton className="h-22 w-40 -ml-9" />
        </div>

        <Separator className="mb-5 -mt-4 mx-8 md:mx-5 w-[200px]" />

        {/* User Profile Skeleton */}
        <div className="mb-4 flex items-center text-sm gap-2 px-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        {/* Navigation Links Skeleton */}
        <div className="flex flex-col space-y-3 px-4">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="-ml-2 h-11 rounded-lg w-[240px]" />
          ))}
        </div>

        {/* Sign Out Button Skeleton */}
        <div className="mt-108 mb-auto px-4 pb-4">
          <Skeleton className="-ml-2 h-11 rounded-lg w-[240px]" />
        </div>
      </div>
    </div>
  );
}

export function TasksSkeleton() {
  return (
    <div className="space-y-5 p-2 sm:p-6 md:p-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 sm:h-9 w-[66px] sm:w-[100px]" /> {/* Tasks */}
        <Skeleton className="h-4 sm:h-5 w-[165px] sm:w-[185px]" /> {/* h2 */}
      </div>

      {/* Command Bar */}
      <div className="flex gap-2 items-center">
        <Skeleton className="h-7 w-[118px]" /> {/* Create Task button */}
        <Skeleton className="h-7 w-[150px] sm:w-[250px]" /> {/* Search input */}
        <div className="hidden sm:flex gap-2 mr-auto">
          <Skeleton className="h-7 w-[88px]" /> {/* Status filter */}
          <Skeleton className="h-7 w-[88px]" /> {/* Priority filter */}
        </div>
      </div>

      {/* Table Header */}
      <div className="rounded-md border">
        <div className="border-b p-2.5">
          <div className="grid grid-cols-7 gap-2 items-center">
            <Skeleton className="flex -ml-1 h-5 w-[20px]" /> {/* Checkbox */}
            <Skeleton className="hidden sm:flex -ml-40 h-5 w-[45px]" />{" "}
            {/* Task */}
            <Skeleton className="flex -ml-3 sm:-ml-24 h-5 w-[50px]" />{" "}
            {/* Title */}
            <Skeleton className="flex h-5 ml-18 sm:-ml-2 w-[70px]" />{" "}
            {/* Due Date */}
            <Skeleton className="hidden sm:flex ml-8 h-5 w-[60px]" />{" "}
            {/* Status */}
            <Skeleton className="hidden sm:flex ml-24 h-5 w-[70px]" />{" "}
            {/* Priority */}
            <Skeleton className="flex ml-44 sm:ml-28 h-5 w-[20px]" />{" "}
            {/* Actions */}
          </div>
        </div>

        {/* Table Rows */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="border-b p-4">
            <div className="grid grid-cols-7 items-center">
              <Skeleton className="flex h-4 -ml-2 w-[20px]" /> {/* Checkbox */}
              <Skeleton className="hidden sm:flex -ml-40 h-4 w-[120px]" />{" "}
              {/* Task */}
              <Skeleton className="-ml-4 sm:-ml-24 h-4 w-[90px]" />{" "}
              {/* Title */}
              <Skeleton className="h-4 ml-18 sm:-ml-1 w-[90px]" />{" "}
              {/* Due Date */}
              <Skeleton className="hidden sm:block h-4 ml-10 w-[86px]" />{" "}
              {/* Status */}
              <Skeleton className="hidden sm:block h-4 ml-28 w-[70px]" />{" "}
              {/* Priority */}
              <Skeleton className="h-4 ml-44 sm:ml-32 w-[20px]" />{" "}
              {/* Actions */}
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className="-p-1 flex items-center justify-between">
        <Skeleton className="h-5 sm:h-6 w-[165px] sm:w-[175px]" />{" "}
        {/* Selected items count */}
        <div className="hidden sm:flex gap-6 items-center">
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

export function EditTaskSkeleton() {
  return (
    <div className="container w-full mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-26" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-60 sm:w-72" />
          <Skeleton className="h-4 w-52" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-16">
          {/* Description Section */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="w-full h-[150px] sm:h-[200px] overflow-y-auto rounded-lg 2xl:w-[600px] p-4" />

            {/* Task Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-18" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-26 mb-2" />
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

export function SettingsSkeleton() {
  return (
    <div className="space-y-6 p-2 sm:p-6 md:p-8">
      <div className="flex-1 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        {/* Header Section */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-[120px] sm:h-9" /> {/* Settings */}
          <Skeleton className="h-6 w-[355px]" /> {/* Description */}
        </div>

        <div className="flex w-full py-10">
          <div className="space-y-8 w-full max-w-xl">
            {/* Name field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-8 w-[340px]" />
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-8 w-[340px]" />
            </div>

            {/* Profile Picture */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="h-8 w-[250px]" />
              </div>
            </div>

            {/* Email Notifications toggle */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-9 rounded-full" />
            </div>

            {/* Theme toggle */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>

            {/* Save button */}
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
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
