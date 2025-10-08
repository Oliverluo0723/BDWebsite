// 組件
import Header from "@/layouts/Header/Header";
import MyCursor from "@/components/MyCursor.tsx";
import Footer from "./layouts/Header/Footer";
// Lenis
import Lenis from "lenis";
import "lenis/dist/lenis.css";
//
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    const location = useLocation();
    const hideFooterRoutes = ["/article"]; // 需要隱藏 Footer 的路由

    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
    return (
        <>
            <MyCursor />
            <div className="app p-4">
                <Header />
                <div className="mt-24"></div>
                <Outlet />
            </div>
            {!shouldHideFooter && <Footer />}{" "}
        </>
    );
}

export default App;
