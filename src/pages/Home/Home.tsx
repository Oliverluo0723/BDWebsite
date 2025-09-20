// Gsap
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// 圖片
import heroImg from "@/assets/imgs/works/img1.jpg";
import work1Img from "@/assets/imgs/works/img1.jpg";
import work2Img from "@/assets/imgs/works/img2.jpg";
import work3Img from "@/assets/imgs/works/img3.png";
import work4Img from "@/assets/imgs/img1.png";
// hooks
import { useRevealer } from "@/hooks/useRevealer.tsx";
// 組件
import Marquee from "@/pages/Home/components/Marquee.tsx"; // 跑馬燈
import Card from "@/components/Card/Card";
// CSS
import "./Home.css";

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
            yPercent: 15,
            scale: 0.8,
            autoAlpha: 0,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: ".work",
                start: "top 80%",
                end: "top 40%",
                scrub: 1,
            },
        });

        gsap.from(".core-wrap", {
            yPercent: 10,
            scale: 0.8,
            autoAlpha: 0,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: ".core-wrap",
                start: "top 90%",
                end: "top 50%",
                scrub: 1,
            },
        });
    }, []);
    return (
        <>
            <div className="revealer"></div>
            <section className="text-center mt-38">
                <h1 className="h1 text-[11.5vw] will-change-transform tan-pearl ">
                    Hi, I am bd
                </h1>
                {/*  */}
                <div className="w-2/3 mx-auto aspect-[16/9]">
                    <img className="heroImg" src={heroImg} alt="" />
                </div>
                <h6 className="w-48 absolute top-150 md:top-120 left-15 text-left leading-relaxed pointer-events-none">
                    在這裡, 我分享關於 視覺設計、前端開發、UI/UX,
                    紀錄我所學習與創作的一切
                </h6>
            </section>
            {/* 跑馬燈 */}
            <div className="w-full h-fit">
                <Marquee words="Scroll down to see magic " />
            </div>
            {/* 作品 */}
            <section className="work-wrap w-full min-h-svh mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
                <div className="h-[400px] lg:h-[650px] bg-pink-400 work">
                    <img loading="lazy" src={work1Img} alt="" />
                    <h2>Listen 2023.04.07</h2>
                </div>
                <div className="h-[400px] lg:h-[650px] bg-blue-400 work">
                    <img loading="lazy" src={work2Img} alt="" />
                    <h2>Listen 2023.04.07</h2>
                </div>
                <div className="h-[400px] lg:h-[650px] bg-yellow-400 work">
                    <img loading="lazy" src={work3Img} alt="" />
                    <h2>Listen 2023.04.07</h2>
                </div>
                <div className="h-[400px] lg:h-[650px] bg-green-400 work">
                    <img loading="lazy" src={work4Img} alt="" />
                    <h2>Listen 2023.04.07</h2>
                </div>
            </section>
            {/* 核心能力 */}
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
                {/* Slider */}
            </section>
            <div className="w-full h-screen"></div>
        </>
    );
}
