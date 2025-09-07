import "@/pages/Home/Home.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
    words: string;
}

export default function Marquee(prop: Props) {
    useGSAP(() => {
        gsap.to(".marquee-words", {
            xPercent: -50,
            duration: 16,
            repeat: -1,
            ease: "none",
        });
    }, {});
    return (
        <div className="marquee w-full h-fit  overflow-hidden">
            <div className="marquee-inner w-fit h-full">
                <p className="marquee-words text-[min(11vw,18.5vw)] leading-normal tan-pearl will-change-transform">
                    {Array(10)
                        .fill(prop.words)
                        .map((word, i) => <span key={i}>{word}</span>) || "marqueemarqueemarqueemarqueemarquee"}
                </p>
            </div>
        </div>
    );
}
