// hooks
import { useRevealer } from "@/hooks/useRevealer.tsx";
// CSS
import "@/pages/About/About.css";
// 圖片
import myPic from "@/assets/imgs/my/img1.png";
// icon
import GithubIcon from "@/components/icon/Github";
import ThreadIcon from "@/components/icon/Thread";
import MediumIcon from "@/components/icon/Medium";
// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

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
        link: "",
    },
    {
        id: 3,
        name: "Medium",
        icon: MediumIcon,
        link: "",
    },
];

export default function About() {
    useRevealer();
    gsap.registerPlugin(useGSAP, SplitText);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 1.4 });
        tl.set(".avatar", {
            scale: 0,
        });
        document.fonts.ready.then(() => {
            SplitText.create(".content", {
                type: "chars words lines",
                mask: "lines",
                smartWrap: true,
                onSplit: (self) => {
                    gsap.from(self.words, {
                        yPercent: 100,
                        duration: 1.2,
                        ease: "power4.inOut",
                        delay: 1,
                        stagger: {
                            amount: 1,
                            from: "start",
                        },
                    });
                },
            });
        });
        tl.to(".avatar", {
            scale: 1,
            autoAlpha: 1,
            duration: 1.3,
            ease: "circ.inOut",
        });
    }, {});
    return (
        <>
            <div className="revealer"></div>
            <div className="about-wrap">
                <div className="avatar">
                    <img src={myPic} alt="" className="avatar-image" />
                </div>
                <div className="w-full flex-center gap-8">
                    {BrandIcon.map((brand) => {
                        return (
                            <div className="w-15 h-15  rounded-full" key={brand.id}>
                                <a href={brand.link} target="_blank">
                                    <brand.icon />
                                </a>
                            </div>
                        );
                    })}
                </div>

                <section className="w-full h-svh flex-col-center">
                    <h2 className="text-5xl font-medium text-center">Hi I am BD</h2>
                    <div className="w-[400px] lg:w-[800px]">
                        <div className="content text-2xl mt-4 leading-relaxed">
                            嗨 我是BD 一名專注於前端開發的工程師, 喜歡將想法透過程式語言實現成有溫度的作品,
                            日常中我不只在意功能是否能順利運作, 更關心使用者體驗是否流暢, 介面是否細緻, 熱愛學習新技術
                            也樂於把複雜的東西轉化成簡單, 直覺的互動, 希望透過專案與作品
                            讓更多人感受到設計與程式結合的美好
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
