"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUiConfig,
} from "@liveblocks/react-ui";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import Image from "next/image";
import { ReactNode } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  variant?: "ghost" | "outline";
  showCount?: boolean;
  size?: "sm" | "md";
}

const Notification = ({
  variant = "ghost",
  showCount = false,
  size = "md",
}: NotificationProps) => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt,
  );

  const iconSize = size === "sm" ? (variant === "outline" ? 15 : 18) : variant === "outline" ? 18 : 24;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "relative flex shrink-0 items-center justify-center transition-colors",
          size === "sm" ? "size-8" : "size-10",
          variant === "outline"
            ? "rounded-md border border-border-strong bg-transparent text-ink-muted hover:bg-border"
            : "rounded-lg text-ink-muted hover:bg-border hover:text-ink",
        )}
      >
        <Bell size={iconSize} />

        {count > 0 &&
          (showCount ? (
            <span className="absolute -right-1.5 -top-1.5 z-20 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground">
              {count > 9 ? "9+" : count}
            </span>
          ) : (
            <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-primary" />
          ))}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-115! border-none! bg-surface-raised! shadow-popover!"
      >
        <LiveblocksUiConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} mentioned you</>
            ),
          }}
        >
          <InboxNotificationList>
            {unreadNotifications.length <= 0 && (
              <p className="py-2 text-center text-ink-muted">No notification</p>
            )}

            {unreadNotifications.length > 0 &&
              unreadNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                  className="bg-surface-raised text-ink"
                  href={`/documents/${notification.roomId}`}
                  showActions={false}

                  kinds={{
                    thread: (props) => (
                      <InboxNotification.Thread
                        {...props}
                        showActions={false}
                        showRoomName={false}
                      />
                    ),

                    textMention: (props) => (
                      <InboxNotification.TextMention
                        {...props}
                        showRoomName={false}
                      />
                    ),

                    $documentAccess: (props) => (
                      <InboxNotification.Custom
                        {...props}
                        title={props.inboxNotification.activities[0].data.title}
                        aside={
                          <InboxNotification.Icon className="bg-transparent">
                            {props.inboxNotification.activities[0].data
                              .avatar ? (
                              <Image
                                src={
                                  (props.inboxNotification.activities[0].data
                                    .avatar as string) || ""
                                }
                                width={36}
                                height={36}
                                alt="avatar"
                                className="rounded-full"
                              />
                            ) : null}
                          </InboxNotification.Icon>
                        }
                      >
                        {props.children}
                      </InboxNotification.Custom>
                    ),
                  }}
                />
              ))}
          </InboxNotificationList>
        </LiveblocksUiConfig>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;