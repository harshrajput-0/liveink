import { useOthers } from "@liveblocks/react/suspense";
import { User } from "lucide-react";
import Image from "next/image";

const ActiveCollaborators = () => {
  const others = useOthers();
  console.log("LIVEBLOCKS OTHERS:", others);

  const collaborators = others
    .filter((other) => other.info)
    .map((other) => other.info);

  if (collaborators.length === 0) return null;

  return (
    <>
      <div className="flex items-center gap-1 rounded-full bg-dark-400/50 px-2 py-1 text-xs text-blue-100 sm:hidden">
        <User size={14} />
        {collaborators.length}
      </div>
      <ul className="hidden items-center justify-end -space-x-3 overflow-hidden sm:flex">
        {collaborators.map(({ id, avatar, name }) => (
          <li key={id}>
            <Image
              src={avatar}
              alt={name}
              width={100}
              height={100}
              className="inline-block size-8 rounded-full ring-1 ring-dark-400"
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ActiveCollaborators;
