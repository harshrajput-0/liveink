import { Header } from "@/components/navigation/Header";
import { Editor } from "@/components/ui/editor/Editor";

const Document = () => {
  return (
    <div className="w-full">
      <Header></Header>
      <Editor />
    </div>
  );
};

export default Document;
