"use client";

import { Download, FileType, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import IconButton, { IconButtonProps } from "@/components/ui/icon-button";
import { downloadAsPDF, downloadAsWord } from "@/lib/documents/download";

interface DownloadMenuProps {
  targetId: string;
  triggerVariant?: IconButtonProps["variant"];
  triggerRounded?: IconButtonProps["rounded"];
  triggerSize?: IconButtonProps["size"];
}

const DownloadMenu = ({
  targetId,
  triggerVariant = "ghost",
  triggerRounded = true,
  triggerSize = "md",
}: DownloadMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          icon={<Download />}
          aria-label="Download document"
          variant={triggerVariant}
          rounded={triggerRounded}
          size={triggerSize}
        />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-56! border! border-border! bg-surface-raised! shadow-popover! p-1.5!"
      >
        <button
          type="button"
          onClick={downloadAsPDF}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-border"
        >
          <FileText size={15} className="text-ink-muted" />
          Download as PDF
        </button>
        <button
          type="button"
          onClick={() => downloadAsWord(targetId)}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-ink transition-colors hover:bg-border"
        >
          <FileType size={15} className="text-ink-muted" />
          Download as Word (.doc)
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default DownloadMenu;
