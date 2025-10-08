import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import type { MouseEvent } from "react";
// Gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const handleNavigation =
        (path: string) => (e: MouseEvent<HTMLAnchorElement>) => {
            if (path === location.pathname) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            setIsMenuOpen(false);

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
        // Logo 動畫
        gsap.from(".logo", {
            opacity: 0,
            x: -20,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
        });

        // 導航項目動畫
        gsap.from(".desktop-nav-item", {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.5,
        });

        // Contact 按鈕動畫
        gsap.set(".contact-btn", {
            scale: 0,
        });

        gsap.to(".contact-btn", {
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            delay: 1.2,
        });

        // Split Text 動畫 (保留原邏輯)
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

    const navLinks = [
        { path: "/about", label: "關於", number: "01" },
        { path: "/work", label: "作品", number: "02" },
        { path: "/article", label: "文章", number: "03" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <div className="logo">
                        <Link
                            to="/"
                            onClick={handleNavigation("/")}
                            className="group relative"
                        >
                            <h1
                                className={`nav-item text-2xl font-bold text-black ${
                                    isMenuOpen ? "text-white" : "text-black"
                                }`}
                            >
                                <span className="relative inline-block">
                                    BD Studio
                                </span>
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <ul className="flex items-center gap-12">
                            {navLinks.map((link) => (
                                <li
                                    key={link.path}
                                    className="desktop-nav-item"
                                >
                                    <Link
                                        to={link.path}
                                        onClick={handleNavigation(link.path)}
                                        className={`group relative flex items-center gap-3 text-base font-medium transition-colors duration-300 ${
                                            location.pathname === link.path
                                                ? "text-orange-400"
                                                : "text-black/70 hover:text-black"
                                        }`}
                                    >
                                        <span className="text-xs font-mono text-black/40 group-hover:text-orange-400 transition-colors">
                                            {link.number}
                                        </span>
                                        <span className="relative">
                                            {link.label}
                                            {location.pathname ===
                                                link.path && (
                                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-500" />
                                            )}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact Button & Mobile Menu Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Contact Button - Desktop */}
                        <button className="contact-btn hidden lg:flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-semibold overflow-hidden group relative transition-all duration-300 hover:scale-105">
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                聯絡我
                            </span>
                            <div className="btn-icon relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-1">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-colors duration-300"
                                >
                                    <path
                                        d="M41.9999 24H5.99994"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M30 12L42 24L30 36"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                                    isMenuOpen
                                        ? "rotate-45 translate-y-2 bg-white"
                                        : ""
                                }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                                    isMenuOpen ? "opacity-0 bg-white" : ""
                                }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                                    isMenuOpen
                                        ? "-rotate-45 -translate-y-2 bg-white"
                                        : ""
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
                    isMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Background with blur */}
                <div
                    className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 pt-28">
                    <nav className="w-full max-w-md">
                        <ul className="space-y-8">
                            {navLinks.map((link, index) => (
                                <li
                                    key={link.path}
                                    className={`transform transition-all duration-500 ${
                                        isMenuOpen
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-10 opacity-0"
                                    }`}
                                    style={{
                                        transitionDelay: isMenuOpen
                                            ? `${index * 100}ms`
                                            : "0ms",
                                    }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={handleNavigation(link.path)}
                                        className="group flex items-center gap-6 text-4xl md:text-5xl font-bold"
                                    >
                                        <span className="text-lg text-white/40 font-mono group-hover:text-orange-400 transition-colors">
                                            {link.number}
                                        </span>
                                        <span
                                            className={`relative ${
                                                location.pathname === link.path
                                                    ? "text-orange-400"
                                                    : "text-white group-hover:text-orange-400"
                                            } transition-colors duration-300`}
                                        >
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-500" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Contact Button */}
                        <div
                            className={`mt-16 transform transition-all duration-500 ${
                                isMenuOpen
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-10 opacity-0"
                            }`}
                            style={{
                                transitionDelay: isMenuOpen ? "300ms" : "0ms",
                            }}
                        >
                            <button className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black rounded-full font-semibold text-lg overflow-hidden group relative">
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    聯絡我
                                </span>
                                <div className="btn-icon relative z-10 w-6 h-6 transition-all duration-300 group-hover:translate-x-1">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M41.9999 24H5.99994"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M30 12L42 24L30 36"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                        </div>
                    </nav>

                    {/* Social Links in Mobile Menu */}
                    <div
                        className={`mt-auto pt-12 flex gap-6 transform transition-all duration-500 ${
                            isMenuOpen
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                        style={{
                            transitionDelay: isMenuOpen ? "400ms" : "0ms",
                        }}
                    >
                        <a
                            href="#"
                            className="text-white/60 hover:text-orange-400 transition-colors text-sm"
                        >
                            Github
                        </a>
                        <span className="text-white/20">•</span>
                        <a
                            href="#"
                            className="text-white/60 hover:text-orange-400 transition-colors text-sm"
                        >
                            Thread
                        </a>
                        <span className="text-white/20">•</span>
                        <a
                            href="#"
                            className="text-white/60 hover:text-orange-400 transition-colors text-sm"
                        >
                            Medium
                        </a>
                    </div>
                </div>
            </div>

            {/* Spacer to prevent content from going under fixed header */}
            <div className="h-20" />
        </>
    );
}
