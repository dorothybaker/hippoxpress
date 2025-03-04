import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Toaster />
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
