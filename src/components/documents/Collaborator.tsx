import { CollaboratorProps } from "@/types/types";
import Image from "next/image";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "@/components/ui/button";
import { useCollaboratorAccess } from "@/hooks/documents/useCollaboratorAccess";

const Collaborator = ({
  roomId,
  creatorId,
  collaborator,
  email,
  user,
}: CollaboratorProps) => {
  const { userType, setUserType, loading, changeAccessHandler, removeCollaboratorHandler } =
    useCollaboratorAccess({ roomId, email, collaborator, updatedBy: user });

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
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-ink">
            {collaborator.name}
            <span>{loading && "updating..."}</span>
          </p>
          <p className="text-sm font-light text-ink-muted">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-ink-muted">Owner</p>
      ) : (
        <div className="flex items-center gap-2">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={changeAccessHandler}
          />
          <Button
            type="submit"
            disabled={loading}
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            className="rounded-md bg-transparent px-2 text-destructive transition-colors hover:bg-destructive-tint hover:text-destructive-hover"
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
