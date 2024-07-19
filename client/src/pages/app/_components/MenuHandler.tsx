import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useApp } from "../hooks/useApp";
import { useLogoutUserMutation } from "@/services/apiServices";
import { useNavigate } from "react-router-dom";

const MenuHandler = () => {
  const { currentUser } = useApp();
  const [logout, { isLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={"bottom"} className="flex items-center gap-2">
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
        {currentUser?.role === "User" && (
          <Button variant={"elevated"} onClick={() => navigate("dashboard")}>
            Dashboard
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MenuHandler;
