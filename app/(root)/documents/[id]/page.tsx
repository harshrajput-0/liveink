/* eslint-disable react/no-children-prop */
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { Editor } from "@/components/ui/editor/Editor";

const Document = () => {
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom>
      <Editor></Editor>
      </CollaborativeRoom>
    </main>
  );
};

export default Document;
