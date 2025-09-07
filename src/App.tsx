// 組件
import Header from "@/layouts/Header/Header";
import MyCursor from "@/components/MyCursor.tsx";
// Lenis
import Lenis from "lenis";
import "lenis/dist/lenis.css";
//
import { Outlet } from "react-router-dom";
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

    return (
        <>
            <MyCursor />
            <div className="app p-4">
                <Header />
                <Outlet />
            </div>
        </>
    );
}

export default App;
