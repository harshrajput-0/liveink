import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";
import { CollaboratorProps, UserType } from "@/types/types";
import Image from "next/image";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import { useState } from "react";

const Collaborator = ({
  roomId,
  creatorId,
  collaborator,
  email,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || "viewer");
  const [loading, setLoading] = useState(false);

  const shareDcoumentHandler = async (type: string) => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType,
      updatedBy: user,
    });

    setLoading(false);
  };

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);

    await removeCollaborator({ roomId, email });

    setLoading(false);
  };
  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-1">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={32}
          height={32}
          className="size-8 rounded-full"
        />

        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span>{loading && "updating..."}</span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">Owner</p>
      ) : (
        <div className="flex items-center gap-2">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={shareDcoumentHandler}
          />
          <Button
            type="submit"
            disabled={loading}
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            className="rounded-md bg-transparent px-2 text-red-500 transition-colors hover:bg-red-500/50 hover:text-red-400"
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
