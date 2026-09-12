"use client";

import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { AddDocumentBtnProps } from "@/types/types";
import { useCreateDocument } from "@/hooks/documents/useCreateDocument";

const AddDocumentBtn = ({
  userId,
  email,
  label = "Create a blank document",
}: AddDocumentBtnProps) => {
  const { loading, createAndOpenDocument } = useCreateDocument({
    userId,
    email,
  });

  return (
    <Button
      type="submit"
      onClick={createAndOpenDocument}
      disabled={loading}
      className="gradient-primary flex gap-1 text-primary-foreground shadow-card"
    >
      {loading ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        <Plus size={24} />
      )}
      <p className="hidden sm:block">{loading ? "Create..." : label}</p>
    </Button>
  );
};

export default AddDocumentBtn;
