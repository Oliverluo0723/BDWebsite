import { useLocation, useNavigate, Link } from "react-router-dom";
import type { MouseEvent } from "react";
import "./Header.module.css";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    // 檢查瀏覽器是否支持 View Transitions API
    const supportsViewTransitions = "startViewTransition" in document;

    const triggerPageTransition = () => {
        // 這個函數用於在 transition.ready 後執行自定義動畫
        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
                },
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                },
            ],
            {
                duration: 800,
                easing: "cubic-bezier(0.9, 0, 0.1, 1)",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    };

    const handleNavigation = (path: string) => (e: MouseEvent<HTMLAnchorElement>) => {
        if (path === location.pathname) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        if (supportsViewTransitions) {
            const transition = document.startViewTransition(() => {
                navigate(path);
            });

            // 在 transition 準備就緒後執行自定義動畫
            transition.ready.then(() => {
                triggerPageTransition();
            });
        } else {
            // 降級處理：沒有 View Transitions 支持時使用普通導航
            navigate(path);
        }
    };

    return (
        <header className="w-full h-24 flex items-center justify-between px-6">
            <div>
                <Link to="/" onClick={handleNavigation("/")} className="text-2xl font-bold">
                    <h1>nurovo</h1>
                </Link>
            </div>

            <div>
                <ul>
                    <li>
                        <Link
                            to="/about"
                            onClick={handleNavigation("/about")}
                            className="hover:text-blue-500 transition-colors"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/work"
                            onClick={handleNavigation("/work")}
                            className="hover:text-blue-500 transition-colors"
                        >
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            onClick={handleNavigation("/contact")}
                            className="hover:text-blue-500 transition-colors"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <p className="text-sm">sn3c.Inc</p>
            </div>
        </header>
    );
}
