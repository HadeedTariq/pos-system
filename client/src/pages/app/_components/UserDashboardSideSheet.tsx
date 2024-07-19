import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import UserSideElement from "./UserSidebarElement";

const UserSidebarSheet = () => {
  return (
    <div className="min-[900px]:hidden">
      <Sheet>
        <SheetTrigger className="flex items-start justify-normal p-2">
          <AlignRight />
        </SheetTrigger>
        <SheetContent className="w-[300px]" side={"left"}>
          <SheetHeader>
            <SheetTitle>User Dashboard</SheetTitle>
          </SheetHeader>
          <UserSideElement />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserSidebarSheet;
