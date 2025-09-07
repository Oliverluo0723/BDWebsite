import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
// 頁面
import Home from "@/pages/Home/Home";
import Contact from "@/pages/Contact/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
]);
