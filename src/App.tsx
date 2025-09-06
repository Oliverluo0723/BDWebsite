import Lenis from "lenis";
import "lenis/dist/lenis.css";
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
            <div className="app p-4">
                <Outlet />
            </div>
        </>
    );
}

export default App;
