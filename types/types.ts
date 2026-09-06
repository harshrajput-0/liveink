import { ThreadData } from "@liveblocks/client";

export type AddDocumentBtnProps = {
  userId: string;
  email: string;
};

export type UserType = "creator" | "editor" | "viewer";

export type EditorProps = {
  roomId: string;
  currentUserType: UserType;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

export type CollaborativeRoomProps = {
  roomId: string;
  roomMetadata: {
    creatorId: string;
    email: string;
    title: string;
  };
  users: User[];
  currentUserType: UserType;
};

export type DeleteModalProps = {
  roomId: string;
};

export type ThreadWrapperProps = {
  thread: ThreadData;
};

export type CollaboratorProps = {
  roomId: string;
  email: string;
  creatorId: string;
  collaborator: User;
  user: User;
};

export type UserTypeSelectorParams = {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  onClickHandler?: (value: string) => void;
  disabled?: boolean;
};

export type ShareDocumentDialogProps = {
  roomId: string;
  collaborators: User[];
  creatorId: string;
  currentUserType: UserType;
};
