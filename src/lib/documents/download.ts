/**
 * Pure DOM/browser logic for exporting the editor content.
 * No React, no state — just side-effecting functions the UI layer calls.
 */

/** Read the current document title from the DOM for use as a filename. */
export function getDocumentFileName() {
  const docTitle = document.getElementById("liveink-doc-title");
  const raw = docTitle?.textContent?.trim();
  const safe = (raw || "document").replace(/[\\/:*?"<>|]+/g, " ").trim();

  return safe || "document";
}

/** Trigger the browser print dialog (used for "Download as PDF"). */
export function downloadAsPDF() {
  window.print();
}

/** Export the given element's HTML as a Word-compatible .doc file. */
export function downloadAsWord(targetId: string) {
  const node = document.getElementById(targetId);
  if (!node) return;

  const title = getDocumentFileName();
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
}
