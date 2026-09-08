"use client";

import { useState } from "react";

import { deleteDocument } from "@/lib/actions/room.actions";

import { Button } from "@/components/ui/button";
import IconButton from "./IconButton";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2, AlertCircle } from "lucide-react";
import { DeleteModalProps } from "@/types/types";

const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }

    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton icon={<Trash2 />} aria-label="delete"></IconButton>
      </DialogTrigger>

      <DialogContent className="w-full! max-w-[min(25rem,calc(100%-2rem))]! rounded-xl! bg-dark-100! border-none! px-5! py-7! shadow-xl! sm:min-w-[min(31.25rem,calc(100%-2rem))]!">
        <DialogHeader>
          <IconButton
            icon={<AlertCircle />}
            aria-label="delete"
            className="text-red-500"
          />

          <DialogTitle className="text-2xl">Delete Document</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this document? This action cannot be
            undone
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 items-center justify-center">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading} className="w-1/2 m-0">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteDocumentHandler}
            disabled={loading}
            className="gradient-red w-1/2 transition-[filter] hover:brightness-110 active:brightness-95 m-0"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
