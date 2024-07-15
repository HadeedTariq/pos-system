import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import SellerSideElement from "./SellerSideElement";

const SellerSidebarSheet = () => {
  return (
    <div className="min-[900px]:hidden">
      <Sheet>
        <SheetTrigger className="flex items-start justify-normal p-2">
          <AlignRight />
        </SheetTrigger>
        <SheetContent className="w-[300px]" side={"left"}>
          <SheetHeader>
            <SheetTitle>Seller Dashboard</SheetTitle>
          </SheetHeader>
          <SellerSideElement />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SellerSidebarSheet;
