"use client";

import { useOnlineStatus } from "@/hooks";

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline === null || isOnline) return null;

  return (
    <div className="sticky top-0 z-50 bg-yellow-500 px-4 py-2 text-center text-white">
      You're offline. Changes will sync when you're back online.
    </div>
  );
}
