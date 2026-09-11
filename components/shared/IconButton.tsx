import React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  "aria-label": string;
  variant?: "ghost" | "solid" | "outline";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<IconButtonProps["size"]>, string> = {
  sm: "size-8 [&_svg]:size-4",
  md: "size-10 [&_svg]:size-5",
  lg: "size-12 [&_svg]:size-6",
};

const VARIANT_CLASSES: Record<
  NonNullable<IconButtonProps["variant"]>,
  string
> = {
  // transparent by default, tints on hover/active — good for navbars/toolbars
  ghost: cn(
    "bg-transparent text-ink-muted",
    "hover:bg-border hover:text-ink",
    "active:bg-border-strong active:scale-95",
  ),
  // filled brand color — good for a single primary icon action
  solid: cn(
    "bg-primary text-primary-foreground",
    "hover:bg-primary-hover",
    "active:bg-primary active:scale-95",
  ),
  // bordered, transparent fill — good on top of images/gradients
  outline: cn(
    "bg-transparent text-ink-muted border border-border-strong",
    "hover:bg-border hover:border-border-strong",
    "active:bg-border-strong active:scale-95",
  ),
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "ghost",
      size = "md",
      rounded = true,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-40",
          rounded ? "rounded-full" : "rounded-md",
          SIZE_CLASSES[size],
          VARIANT_CLASSES[variant],
          className,
        )}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;

/*
Usage:

  import IconButton from "@/components/ui/IconButton";
  import { Bell, Trash2, Settings } from "lucide-react";

  // Default ghost button — good for navbars/toolbars
  <IconButton icon={<Bell />} aria-label="Notifications" />

  // Solid brand-colored button — good for a single primary action
  <IconButton icon={<Settings />} aria-label="Settings" variant="solid" />

  // Outline button — good on top of images or gradient backgrounds
  <IconButton icon={<Trash2 />} aria-label="Delete" variant="outline" />

  // Sizes
  <IconButton icon={<Bell />} aria-label="Notifications" size="sm" />
  <IconButton icon={<Bell />} aria-label="Notifications" size="lg" />

  // Square instead of circular
  <IconButton icon={<Bell />} aria-label="Notifications" rounded={false} />

  // Disabled
  <IconButton icon={<Bell />} aria-label="Notifications" disabled />

  // With onClick, like any button
  <IconButton
    icon={<Trash2 />}
    aria-label="Delete document"
    variant="outline"
    onClick={() => handleDelete()}
  />
*/
