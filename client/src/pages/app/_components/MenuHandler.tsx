import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useApp } from "../hooks/useApp";
import { useLogoutUserMutation } from "@/services/apiServices";

const MenuHandler = () => {
  const { currentUser } = useApp();
  const [logout, { isLoading }] = useLogoutUserMutation();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        {currentUser && (
          <Button
            variant={"warning"}
            disabled={isLoading}
            onClick={async () => {
              await logout("");
              window.location.reload();
            }}>
            Logout
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MenuHandler;
