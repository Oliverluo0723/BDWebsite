import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
    words: string;
}

export default function Marquee(prop: Props) {
    useGSAP(() => {
        gsap.to(".marquee-words", {
            xPercent: -100,
            duration: 64,
            repeat: -1,
            ease: "none",
        });
    }, {});
    return (
        <div className="marquee w-full h-fit p-4  overflow-hidden">
            <div className="marquee-inner w-[800vw] h-full">
                <p className="marquee-words text-[min(11vw,18.5vw)] leading-normal tan-pearl will-change-transform">
                    {Array(4)
                        .fill(prop.words)
                        .map((word, i) => <span key={i}>{word}</span>) || "marqueemarqueemarqueemarqueemarquee"}
                </p>
            </div>
        </div>
    );
}
