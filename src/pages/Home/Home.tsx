// Gsap
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// 圖片
import heroImg from "@/assets/img1.png";
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
                autoSplit: true,
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
        });
        //
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
    }, []);
    return (
        <>
            <div className="revealer"></div>
            <div className="h-24"></div>
            <section className="text-center">
                <h1 className="h1 text-[18.5vw] will-change-transform tan-pearl">nurove</h1>
                {/*  */}
                <div className="w-2/3 mx-auto aspect-[16/9]">
                    <img className="heroImg" src={heroImg} alt="" />
                </div>
            </section>
            <section className="w-full h-svh">
                {/* 跑馬燈 */}
                <Marquee words="hihi" />
            </section>
        </>
    );
}
