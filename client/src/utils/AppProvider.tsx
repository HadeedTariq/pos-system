import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as Redux } from "react-redux";
import { store } from "@/store/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const client = new QueryClient();

type ProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={client}>
      <Redux store={store}>
        <BrowserRouter>
          {children}
          <Toaster />
        </BrowserRouter>
      </Redux>
    </QueryClientProvider>
  );
};

export default AppProvider;
