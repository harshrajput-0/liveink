import { HeadingNode } from "@lexical/rich-text";
import { liveblocksConfig } from "@liveblocks/react-lexical";
import { canEditContent } from "@/lib/permissions";
import editorTheme from "@/components/editor/editorTheme";
import type { UserType } from "@/types/types";

/**
 * Builds the LexicalComposer initial config for the LiveInk editor,
 * wired up with Liveblocks collaboration and the app's editor theme.
 */
export function createEditorConfig(currentUserType: UserType) {
  return liveblocksConfig({
    namespace: "MyEditor",
    theme: editorTheme,
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    editable: canEditContent(currentUserType),
  });
}
