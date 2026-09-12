import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShareDocumentDialogProps } from "@/types/types";

import { Share2 } from "lucide-react";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { useShareDocument } from "@/hooks/documents/useShareDocument";

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const {
    self,
    open,
    setOpen,
    loading,
    error,
    email,
    setEmail,
    userType,
    setUserType,
    shareDocumentHandler,
  } = useShareDocument({ roomId });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gradient-primary flex h-9 gap-1 px-4 text-primary-foreground transition-[filter] hover:brightness-110 active:brightness-95"
          disabled={currentUserType !== "creator"}
        >
          <Share2 size={18} />
          <p className="ml-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full! max-w-[min(25rem,calc(100%-2rem))]! rounded-xl! border-none! bg-surface! bg-cover! px-5! py-7! shadow-popover! sm:min-w-[min(31.25rem,calc(100%-2rem))]!"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Manage who can view this document</DialogTitle>
          <DialogDescription>
            Select which users can view or edit the document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-ink-muted">
          Email Address
        </Label>

        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center rounded-md bg-border">
            <Input
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-11! flex-1! border-none! bg-border! focus-visible:ring-0! focus-visible:ring-offset-0! disabled:cursor-not-allowed! disabled:opacity-60!"
            />

            <UserTypeSelector
              userType={userType}
              setUserType={setUserType}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            onClick={shareDocumentHandler}
            className="gradient-primary flex h-full w-28 gap-1 px-5 text-primary-foreground transition-[filter] hover:brightness-110 active:brightness-95 disabled:opacity-60"
            disabled={loading || !email}
          >
            {loading ? "Sending..." : "Invite"}
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={self.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
