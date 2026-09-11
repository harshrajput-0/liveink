"use client";

import { Download, FileType, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import IconButton, { IconButtonProps } from "./IconButton";

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
  const getFileName = () => {
    const docTitle = document.getElementById("inksync-doc-title");
    const raw = docTitle?.textContent?.trim();
    const safe = (raw || "document").replace(/[\\/:*?"<>|]+/g, " ").trim();

    return safe || "document";
  };

  const downloadAsPDF = () => {
    window.print();
  };

  const downloadAsWord = () => {
    const node = document.getElementById(targetId);
    if (!node) return;

    const title = getFileName();
    const contentHtml = node.innerHTML;
    const html = `<!DOCTYPE html>
                      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
                      <head>
                        <meta charset="utf-8" />
                        <title>${title}</title>
                        <!--[if gte mso 9]>
                        <xml>
                          <w:WordDocument>
                            <w:View>Print</w:View>
                            <w:Zoom>100</w:Zoom>
                            <w:DoNotOptimizeForBrowser/>
                          </w:WordDocument>
                        </xml>
                        <![endif]-->
                        <style>
                          body { font-family: Georgia, 'Times New Roman', serif; font-size: 12pt; color: #22221E; background: #FFFFFF; }
                          h1, h2, h3, h4, h5 { font-family: Georgia, 'Times New Roman', serif; }
                        </style>
                      </head>
                      <body>
                        ${contentHtml}
                      </body>
                      </html>`;

    const blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
          onClick={downloadAsWord}
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