"use client";

import { useState } from "react";

import { deleteDocument } from "@/lib/actions/room.actions";

import { Button } from "./ui/button";
import IconButton from "./IconButton";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2, AlertCircle } from "lucide-react";


export const DeleteModal = ({ roomId }: DeleteModalProps) => {
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
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <IconButton icon={<Trash2 />} aria-label="delete"></IconButton>
            </DialogTrigger>

            <DialogContent className="w-full! max-w-100! rounded-xl! bg-dark-100! border-none! px-5! py-7! shadow-xl! sm:min-w-125!">
                <DialogHeader>
                    <IconButton icon={<AlertCircle />} aria-label="delete" />

                    <DialogTitle>Delete Document</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this document? This action cannot be undone</DialogDescription>
                </DialogHeader>

                <Button variant="destructive" onClick={deleteDocumentHandler} className="gradient-red w-full">
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}