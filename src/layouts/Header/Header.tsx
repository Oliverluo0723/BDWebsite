import { useLocation, useNavigate, Link } from "react-router-dom";
import type { MouseEvent } from "react";
import "@/layouts/Header/Header.css";
// Gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

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

    gsap.registerPlugin(useGSAP, SplitText);
    useGSAP(() => {
        gsap.set(".contact-btn", {
            scale: 0,
        });

        gsap.to(".contact-btn", {
            scale: 1,
            duration: 0.4,
            ease: "power4.out",
            delay: 1.8,
        });
        document.fonts.ready.then(() => {
            SplitText.create(".nav-item", {
                type: "words",
                mask: "words",
                smartWrap: true,
                onSplit: (self) => {
                    gsap.from(self.words, {
                        yPercent: -100,
                        autoAlpha: 1,
                        duration: 1.1,
                        ease: "power3.inOut",
                        delay: 1.4,
                    });
                },
            });
        });
    });

    return (
        <header className="w-full h-24 flex items-center justify-between px-6">
            <div>
                <Link to="/" onClick={handleNavigation("/")} className="text-2xl font-bold">
                    <h1 className="nav-item">BD</h1>
                </Link>
            </div>

            <div>
                <ul>
                    <li>
                        <Link to="/about" onClick={handleNavigation("/about")} className="nav-item">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/work" onClick={handleNavigation("/work")} className="nav-item">
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={handleNavigation("/contact")} className="nav-item">
                            Article
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="contact-btn">
                <div>Contact</div>
                <div className="btn-icon">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M41.9999 24H5.99994"
                            stroke="#333"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M30 12L42 24L30 36"
                            stroke="#333"
                            stroke-width="4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </header>
    );
}
