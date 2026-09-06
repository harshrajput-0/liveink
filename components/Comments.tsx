import { cn } from "@/lib/utils";
import { ThreadWrapperProps } from "@/types/types";
import { useIsThreadActive } from "@liveblocks/react-lexical";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useThreads } from "@liveblocks/react/suspense";
import React from "react";

const ThreadWrapper = ({ thread }: ThreadWrapperProps) => {
  const isActive = useIsThreadActive(thread.id);

  return (
    <Thread
      thread={thread}
      data-state={isActive ? "active" : null}
      className={cn(
        "comment-thread border",
        isActive && "border-blue-500! shadow-md",
        thread.resolved && "opacity-40",
      )}
    />
  );
};

const Comments = () => {
  const { threads } = useThreads();
  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center gap-4 lg:w-fit">
      <Composer className="w-full max-w-200 border border-dark-300 bg-dark-200 shadow-sm lg:w-87.5" />

      {threads.map((thread) => (
        <ThreadWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default Comments;
