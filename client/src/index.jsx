import React from "react";
import ReactDOM from "react-dom/client";
import "prismjs/themes/prism.css";
import "./utils/Syntax.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
import { useQueryClient, QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient=new QueryClient()
root.render(
  <React.StrictMode>
    <BrowserRouter>
     
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
            <App  />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      
    </BrowserRouter>
  </React.StrictMode>
);
