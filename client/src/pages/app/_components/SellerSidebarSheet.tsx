import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignRight,
  ArrowRight,
  Home,
  MoveRightIcon,
  ShoppingBag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SellerSidebarSheet = () => {
  const { pathname } = useLocation();

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
          <div className="flex flex-col w-full flex-1 overflow-y-auto">
            <nav className="flex-1 ">
              <Link
                to=""
                className={`flex items-center px-4 py-2 gap-2 text-gray-100 hover:bg-gray-700 ${
                  pathname === "/seller/dashboard" ? "bg-slate-700" : ""
                }`}>
                <Home />
                Home
              </Link>
              <Link
                to="products"
                className={`flex items-center px-4 py-2 mt-2 gap-2 text-gray-100 hover:bg-gray-700 ${
                  pathname === "/seller/dashboard/products"
                    ? "bg-slate-700"
                    : ""
                }`}>
                <ShoppingBag />
                Products
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SellerSidebarSheet;
