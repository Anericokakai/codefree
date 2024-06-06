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
import 'react-loading-skeleton/dist/skeleton.css'
import {SkeletonTheme} from 'react-loading-skeleton'
const root = ReactDOM.createRoot(document.getElementById("root"));
import { useQueryClient, QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient=new QueryClient()
root.render(
  <React.StrictMode>
    <BrowserRouter>
     
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <SkeletonTheme baseColor="#11101d" highlightColor="#3f3f3f" borderRadius={10}>
              <App  />
              </SkeletonTheme>

            </QueryClientProvider>
          </PersistGate>
        </Provider>
      
    </BrowserRouter>
  </React.StrictMode>
);
