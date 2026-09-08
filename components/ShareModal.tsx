import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelf } from "@liveblocks/react/suspense";
import { ShareDocumentDialogProps, UserType } from "@/types/types";

import { Share2 } from "lucide-react";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDcoumentHandler = async () => {
    setLoading(true);
    setError("");

    try {
      await updateDocumentAccess({
        roomId,
        email,
        userType: userType as UserType,
        updatedBy: user.info,
      });
      setEmail("");
    } catch (error) {
      console.log(error);
      setError("Unable to send invite. Check email and try again");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gradient-blue flex h-9 gap-1 px-4 transition-[filter] hover:brightness-110 active:brightness-95"
          disabled={currentUserType !== "creator"}
        >
          <Share2 size={18} />
          <p className="ml-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full! max-w-[min(25rem,calc(100%-2rem))]! rounded-xl! border-none! bg-dark-300! bg-cover! px-5! py-7! shadow-xl! sm:min-w-[min(31.25rem,calc(100%-2rem))]!"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Manage who can view this document</DialogTitle>
          <DialogDescription>
            Select which users can view or edit the document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email Address
        </Label>

        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center rounded-md bg-dark-400">
            <Input
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-11! flex-1! border-none! bg-dark-400! focus-visible:ring-0! focus-visible:ring-offset-0! disabled:cursor-not-allowed! disabled:opacity-60!"
            />

            <UserTypeSelector
              userType={userType}
              setUserType={setUserType}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            onClick={shareDcoumentHandler}
            className="gradient-blue flex h-full w-28 gap-1 px-5 transition-[filter] hover:brightness-110 active:brightness-95 disabled:opacity-60"
            disabled={loading || !email}
          >
            {loading ? "Sending..." : "Invite"}
          </Button>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
