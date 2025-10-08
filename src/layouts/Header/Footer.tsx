import { useState, useEffect, useRef } from "react";
// icon
import GithubIcon from "@/components/icon/Github";
import ThreadIcon from "@/components/icon/Thread";
import MediumIcon from "@/components/icon/Medium";

const ArrowIcon = () => (
    <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
);

function Footer() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [time, setTime] = useState(new Date());
    // 修正：明確指定 ref 型別
    const ctaRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (ctaRef.current && cursorRef.current) {
                const rect = ctaRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePosition({ x, y });
            }
        };

        const ctaElement = ctaRef.current;
        if (ctaElement) {
            ctaElement.addEventListener("mousemove", handleMouseMove);
            return () =>
                ctaElement.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    const BrandIcon = [
        {
            id: 1,
            name: "Github",
            icon: GithubIcon,
            link: "https://github.com/Oliverluo0723/Oliverluo0723",
        },
        {
            id: 2,
            name: "Thread",
            icon: ThreadIcon,
            link: "https://threads.net",
        },
        { id: 3, name: "Medium", icon: MediumIcon, link: "https://medium.com" },
    ];

    const navLinks = [
        { label: "關於", href: "#about", number: "01" },
        { label: "作品", href: "#work", number: "02" },
        { label: "文章", href: "#article", number: "03" },
        { label: "聯絡", href: "#contact", number: "04" },
    ];

    const currentYear = new Date().getFullYear();
    const localTime = time.toLocaleTimeString("zh-TW", {
        hour12: false,
        timeZone: "Asia/Taipei",
    });

    return (
        <footer className="relative w-full bg-black text-white overflow-hidden">
            {/* 動態背景網格 */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* 漸層光球 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl" />

            {/* 主標題 CTA 區塊 */}
            <div className="relative border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 lg:py-40">
                    <div className="flex flex-col items-start space-y-12">
                        {/* 主標題 */}
                        <div className="w-full">
                            <div className="overflow-hidden">
                                <h2 className="text-6xl  md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight space-y-8">
                                    <span className="block relative left-6 font-bold opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
                                        LET`S
                                    </span>
                                    <span className="block p-4 lg:p-6  bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent opacity-0 animate-[slideUp_0.8s_ease-out_0.4s_forwards] tan-pearl">
                                        CREATE
                                    </span>
                                </h2>
                            </div>
                        </div>

                        {/* CTA 按鈕與自訂游標 */}
                        <div
                            ref={ctaRef}
                            className="relative group"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <a
                                href="mailto:your.email@example.com"
                                className="relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black text-xl md:text-2xl font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
                            >
                                <span className="relative z-10">開始專案</span>
                                <div className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                    <ArrowIcon />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </a>

                            {/* 自訂游標跟隨器 */}
                            {isHovering && (
                                <div
                                    ref={cursorRef}
                                    className="absolute w-24 h-24 bg-orange-500/30 rounded-full blur-xl pointer-events-none transition-transform duration-300 ease-out"
                                    style={{
                                        left: `${mousePosition.x}px`,
                                        top: `${mousePosition.y}px`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 主要內容 */}
            <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* 左欄 - 品牌與描述 */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="text-sm uppercase tracking-[0.3em] text-white/40">
                                前端工程師
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                                打造數位化
                                <br />
                                <span className="text-white/60">體驗</span>
                            </h3>
                            <p className="text-white/60 leading-relaxed max-w-md">
                                將創意轉化為令人驚艷的使用者體驗設計，突破界限，創造lasting影響力。
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {BrandIcon.map((brand) => (
                                <a
                                    key={brand.id}
                                    href={brand.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group w-14 h-14 flex items-center justify-center rounded-full border border-white/20 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-orange-400"
                                    aria-label={brand.name}
                                >
                                    <div className="relative z-10 w-5 h-5 text-white/80 transition-all duration-300 group-hover:text-black group-hover:scale-110">
                                        <brand.icon />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 中欄 - 導航 */}
                    <div className="lg:col-span-3 lg:col-start-7">
                        <div className="space-y-6">
                            <div className="text-sm uppercase tracking-[0.3em] text-white/40">
                                導航
                            </div>
                            <ul className="space-y-4">
                                {navLinks.map((link, index) => (
                                    <li key={link.href} className="group">
                                        <a
                                            href={link.href}
                                            className="flex items-center gap-4 text-lg md:text-xl font-medium transition-all duration-300"
                                            style={{
                                                animationDelay: `${
                                                    index * 0.1
                                                }s`,
                                            }}
                                        >
                                            <span className="text-white/40 text-sm font-mono group-hover:text-orange-400 transition-colors">
                                                {link.number}
                                            </span>
                                            <span className="group-hover:text-orange-400 group-hover:translate-x-2 transition-all duration-300">
                                                {link.label}
                                            </span>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-orange-400">
                                                →
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 右欄 - 聯絡資訊 */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <div className="text-sm uppercase tracking-[0.3em] text-white/40">
                                聯絡方式
                            </div>
                            <div className="space-y-3">
                                <a
                                    href="mailto:your.email@example.com"
                                    className="block text-lg hover:text-orange-400 transition-colors duration-300 break-all"
                                >
                                    your.email@example.com
                                </a>
                                <div className="flex items-center gap-3 text-white/60">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span>可接受專案委託</span>
                                </div>
                            </div>
                        </div>

                        {/* 當地時間小工具 */}
                        <div className="space-y-2">
                            <div className="text-sm uppercase tracking-[0.3em] text-white/40">
                                當地時間
                            </div>
                            <div className="text-3xl md:text-4xl font-mono font-bold tabular-nums">
                                {localTime}
                            </div>
                            <div className="text-white/60">新竹，台灣</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部列 */}
            <div className="relative border-t border-white/10 py-6 overflow-hidden">
                <div className="flex items-center justify-between max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-8 text-sm text-white/40">
                        <span>© {currentYear} Oliver Luo</span>
                        <span className="hidden md:inline">版權所有</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                        <a
                            href="#top"
                            className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2"
                        >
                            <span>回到頂部</span>
                            <span className="inline-block rotate-[-90deg]">
                                →
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </footer>
    );
}

export default Footer;
