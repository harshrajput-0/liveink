import { UserType, UserTypeSelectorParams } from "@/types/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selecItem =
  "my-0.5! cursor-pointer! rounded-full! bg-dark-200! py-2! pl-3! pr-8! text-blue-100! transition-colors! data-highlighted:bg-dark-500 data-highlighted:text-white focus:bg-dark-300! focus:text-blue-100!";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
  disabled,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler?.(type);
  };
  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
      disabled={disabled}
    >
      <SelectTrigger className="w-fit! h-9! items-center! border! border-dark-500! bg-transparent! text-blue-100! leading-none! focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-60">
        <SelectValue />
      </SelectTrigger>

      <SelectContent
        position="popper"
        align="end"
        sideOffset={6}
        className="border-none bg-dark-200! shadow-lg!"
      >
        <SelectItem value="viewer" className={selecItem}>
          can view
        </SelectItem>
        <SelectItem value="editor" className={selecItem}>
          can edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
