"use client";

import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";

interface UseNotificationsPanelParams {
  variant: "ghost" | "outline";
  size: "sm" | "md";
}

/**
 * Pulls the unread-notifications list and count from Liveblocks, and
 * derives the bell icon's size from the trigger's visual variant.
 */
export function useNotificationsPanel({
  variant,
  size,
}: UseNotificationsPanelParams) {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt,
  );

  const iconSize =
    size === "sm"
      ? variant === "outline"
        ? 15
        : 18
      : variant === "outline"
        ? 18
        : 24;

  return { unreadNotifications, count, iconSize };
}
