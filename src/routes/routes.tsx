import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
// 頁面
import Home from "@/pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
]);
