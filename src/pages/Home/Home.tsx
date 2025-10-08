// Gsap
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// 圖片
import heroImg from "@/assets/imgs/works/img1.jpg";
import work1Img from "@/assets/imgs/works/img1.jpg";
import work4Img from "@/assets/imgs/img1.png";
import work5Img from "@/assets/imgs/works/img4.png";
// hooks
import { useRevealer } from "@/hooks/useRevealer.tsx";
// 組件
// import Card from "@/components/Card/Card";
// CSS
import "./Home.css";

const works = [
    {
        id: 1,
        img: work1Img,
        title: "Listen",
        date: "2023.04.07",
        tags: ["UI/UX", "Web Design"],
        color: "from-pink-500/20 to-purple-500/20",
    },
    {
        id: 2,
        video: "/public/videos/output.mp4",
        title: "Charli xcx - 360 in javascript",
        subtitle: "base for Terry Djony",
        date: "2025.04.07",
        tags: ["Frontend", "Animation"],
        color: "from-blue-500/20 to-cyan-500/20",
    },
    {
        id: 3,
        img: work5Img,
        title: "Creative Portfolio",
        date: "2023.04.07",
        tags: ["Branding", "Web"],
        color: "from-amber-500/20 to-orange-500/20",
    },
    {
        id: 4,
        img: work4Img,
        title: "Digital Experience",
        date: "2023.04.07",
        tags: ["Interactive", "3D"],
        color: "from-green-500/20 to-emerald-500/20",
    },
];

export default function Home() {
    useRevealer();
    gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            SplitText.create(".h1", {
                type: "chars",
                mask: "chars",
                smartWrap: true,
                onSplit: (self) => {
                    return gsap.from(self.chars, {
                        yPercent: 100,
                        duration: 1.15,
                        ease: "power3.inOut",
                        stagger: {
                            amount: 0.28,
                            from: "random",
                        },
                        delay: 1.1,
                    });
                },
            });

            SplitText.create("h6", {
                type: "words",
                mask: "words",
                wordsClass: "word++",
                smartWrap: true,
                onSplit: (self) => {
                    gsap.from(self.words, {
                        xPercent: -100,
                        duration: 0.5,
                        ease: "expo.out",
                        stagger: 0.1,
                        delay: 1.3,
                    });
                },
            });
        });

        gsap.from(".heroImg", {
            scale: 0.8,
            yPercent: 50,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: ".heroImg",
                start: "top bottom",
                end: "top 50%",
                scrub: 1,
            },
        });

        gsap.from(".work", {
            yPercent: 30,
            scale: 0.8,
            autoAlpha: 0,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: ".work",
                start: "top 80%",
                end: "top 40%",
                scrub: 1,
            },
        });

        // gsap.from(".core-wrap", {
        //     yPercent: 10,
        //     scale: 0.8,
        //     autoAlpha: 0,
        //     ease: "power3.inOut",
        //     scrollTrigger: {
        //         trigger: ".core-wrap",
        //         start: "top 90%",
        //         end: "top 50%",
        //         scrub: 1,
        //     },
        // });

        gsap.fromTo(
            ".scroll-bar",
            {
                xPercent: -100,
            },
            {
                xPercent: 150,
                ease: "power4.inOut",
                duration: 2,
                repeat: -1,
            }
        );
    }, []);

    return (
        <>
            <div className="revealer"></div>

            {/* Hero Section */}
            <section className="text-center mt-38">
                <h1 className="h1 text-[11.5vw] will-change-transform tan-pearl">
                    Hi, I am bd
                </h1>

                {/* Hero 圖片 */}
                <div className="w-2/3 mx-auto aspect-[16/9]">
                    <img className="heroImg" src={heroImg} alt="" />
                </div>

                {/* 描述文字 */}
                <h6 className="mt-8 text-lg text-black md:text-xl max-w-2xl mx-auto leading-relaxed">
                    在這裡，我分享關於視覺設計、前端開發、UI/UX，
                    紀錄我所學習與創作的一切
                </h6>
            </section>

            {/* 作品集區塊 */}
            <section className="relative py-20 px-6 flex flex-col">
                {/* 標題 */}
                <div className="mb-15 text-center">scroll</div>
                <div className="mb-16 flex-center">
                    <div className="w-20 h-[1px] bg-black/40 rotate-90 overflow-hidden">
                        <div className="w-full h-20 bg-blue-700 scroll-bar"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* 作品網格 */}
                    <div className="work-wrap grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {works.map((work) => (
                            <div
                                key={work.id}
                                className="work group relative h-[400px] md:h-[500px] lg:h-[650px] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform duration-200"
                            >
                                {/* 背景漸層 */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-50 group-hover:opacity-70 group-active:opacity-70 transition-opacity duration-500`}
                                />

                                {/* 圖片或影片 */}
                                <div className="relative w-full h-full overflow-hidden">
                                    {work.video ? (
                                        <video
                                            src={work.video}
                                            controls
                                            className="w-full h-full object-cover scale-100 group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
                                        >
                                            您的瀏覽器無法播放此影片，建議使用
                                            Chrome
                                        </video>
                                    ) : (
                                        <img
                                            loading="lazy"
                                            src={work.img}
                                            alt={work.title}
                                            className="w-full h-full object-cover scale-100 group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
                                        />
                                    )}

                                    {/* 遮罩層 */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* 內容資訊 */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500">
                                    {/* 標籤 */}
                                    <div className="flex gap-2 mb-4 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 delay-100">
                                        {work.tags?.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white/80"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* 標題和日期 */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                        {work.title}
                                    </h3>
                                    {work.subtitle && (
                                        <p className="text-white/70 mb-2">
                                            {work.subtitle}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-white/60 font-mono">
                                            {work.date}
                                        </span>
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 group-hover:translate-x-2 group-active:translate-x-2">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 核心能力 */}
            {/* <h4 className="mt-12 text-3xl font-medium">如果你在尋找</h4>
            <section className="core-wrap w-full mt-12 card-wrap grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-center">
                <Card
                    title="前端工程"
                    content="打造直覺且流暢的數位介面"
                    badges={[
                        "Typescript",
                        "SEO最佳化",
                        "網頁無障礙(A11Y)",
                        "RWD響應式設計",
                        "SSR / SSG / SPA",
                        "懶加載與打包優化",
                    ]}
                />
                <Card
                    title="UI/UX"
                    content="以人為本，構建順暢且沉浸的數位體驗。"
                    bgColor="#FFE1CC"
                    badges={[
                        "Figma",
                        "使用者旅程地圖",
                        "Fitts Law",
                        "Microinteractions",
                        "漸進式揭露資訊",
                    ]}
                />

                <Card
                    title="DevOps"
                    content="透過自動化與可觀察性，實現穩定順暢的服務交付。"
                    bgColor="#E2DBFA"
                    badges={[
                        "CI/CD",
                        "Linux三大觀察指標",
                        "角色權限控制",
                        "容器化",
                        "Git版本控制",
                    ]}
                />
            </section> */}
            {/* <div className="w-full h-screen"></div> */}
        </>
    );
}
