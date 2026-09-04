declare type AddDocumentBtnProps = {
  userId: string;
  email: string;
};

declare type UserType = "creator" | "editor" | "viewer";

type EditorProps = {
  roomId: string;
  currentUserType: UserType;
};

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

declare type CollaborativeRoomProps = {
  roomId: string;
  roomMetadata: {
    createrId: string;
    email: string;
    title: string;
  };
  users: User;
  currentUserType: UserType;
};

declare type DeleteModalProps = {
  roomId: string;
};
