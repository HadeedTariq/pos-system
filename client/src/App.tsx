import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/auth/routes/Register";
import OtpHandler from "./pages/auth/routes/OtpHandler";
import { LoginForm } from "./pages/auth/routes/Login";
import AuthProtector from "./pages/auth/_components/AuthProtector";
import Navbar from "./pages/app/_components/Navbar";
import Home from "./pages/app/routes/Home";
import { useEffect } from "react";
import { useTheme } from "./pages/app/hooks/useTheme";
import SellerProtector from "./pages/app/_components/SellerProtector";
import CreateProduct from "./pages/app/routes/CreateProduct";
import SellerDashboard from "./pages/app/routes/SellerDashboard";
import SellerSidebar from "./pages/app/_components/SellerSidebar";
import SellerProducts from "./pages/app/routes/SellerProducts";
import SellerProductDetails from "./pages/app/routes/SellerProductDetails";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthProtector />}>
        <Route path="register" element={<Register />} />
        <Route path="otpChecker" element={<OtpHandler />} />
        <Route path="login" element={<LoginForm />} />
      </Route>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="seller" element={<SellerProtector />}>
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="dashboard" element={<SellerSidebar />}>
            <Route index element={<SellerDashboard />} />
            <Route path="products">
              <Route index element={<SellerProducts />} />
              <Route path="details" element={<SellerProductDetails />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
