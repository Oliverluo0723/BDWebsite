import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { router } from "@/routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import "@/index.css";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
