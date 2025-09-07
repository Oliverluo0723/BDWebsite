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
                        y: 200,
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
                end: "top center",
                scrub: 1,
            },
        });

        gsap.from(".work", {
            scale: 0.8,
            y: 150,
            autoAlpha: 0,
            // duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: ".work",
                start: "top 80%",
                end: "top 10%",
                scrub: 1,
            },
        });
    }, []);
    return (
        <>
            <div className="revealer"></div>
            <section className="text-center mt-24">
                <h1 className="h1 text-[18.5vw] will-change-transform tan-pearl">nurove</h1>
                {/*  */}
                <div className="w-2/3 mx-auto aspect-[16/9]">
                    <img className="heroImg" src={heroImg} alt="" />
                </div>
                <h6 className="absolute top-5/6 left-5">Spaces defined through light and silence.</h6>
            </section>
            {/* 跑馬燈 */}
            <div className="w-full h-fit">
                <Marquee words="hihi" />
            </div>
            {/* 作品 */}
            <section className="work-wrap w-full min-h-svh  grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        </>
    );
}
