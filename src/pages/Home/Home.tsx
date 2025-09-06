// 組件
import Header from "@/layouts/Header/Header";
// Gsap
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
// 圖片
import heroImg from "@/assets/img1.png";
// hooks
import { useRevealer } from "@/hooks/useRevealer.tsx";

export default function Home() {
    useRevealer();
    gsap.registerPlugin(useGSAP, SplitText);
    useGSAP(() => {
        document.fonts.ready.then(() => {
            SplitText.create(".h1", {
                type: "chars",
                mask: "chars",
                onSplit: (self) => {
                    gsap.from(self.chars, {
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
    }, []);
    return (
        <>
            <Header />
            <div className="revealer"></div>
            <div className="h-8"></div>
            <section className="text-center">
                <h1 className="h1 text-[26.5vw] will-change-transform">nurove</h1>
                <div className="w-2/3 mx-auto aspect-[16/9]">
                    <img src={heroImg} alt="" />
                </div>
            </section>
            <section className="w-full h-svh"></section>
        </>
    );
}
