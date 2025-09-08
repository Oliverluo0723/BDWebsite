import cyber1 from "@/assets/imgs/my/cyberpunk1.jpg";
import cyber2 from "@/assets/imgs/my/cyberpunk2.jpg";
import cyber3 from "@/assets/imgs/my/cyberpunk3.jpg";
import cyber4 from "@/assets/imgs/my/cyberpunk4.jpg";

import "./Slider.css";
// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

export default function Slider() {
    const slides = [
        {
            slideTitle: "Monochrome Signal",
            slideDescription: "黑白之間的對比，像是一種隱喻，將時尚的冷冽感與身份的銳利邊界同時展現。",
            slideUrl: "/",
            slideTags: ["Monochrome", "Editorial", "Fashion", "Visual Identity"],
            slideImg: cyber1,
        },
        {
            slideTitle: "Neon Mirage",
            slideDescription: "燈光與影子的交錯，營造出虛幻卻銳利的場景，彷彿夜晚都市的暗號正在低語。",
            slideUrl: "/",
            slideTags: ["Neon", "Urban", "Conceptual", "Visual Identity"],
            slideImg: cyber2,
        },
        {
            slideTitle: "Crimson Silence",
            slideDescription: "靜止的畫面中滲透出紅色的力量，帶著冷血的優雅，訴說一種不容忽視的存在。",
            slideUrl: "/",
            slideTags: ["Crimson", "Minimal", "Editorial", "Fashion"],
            slideImg: cyber3,
        },
        {
            slideTitle: "Glass Kingdom",
            slideDescription: "透明與反射構築出的冷冽王國，讓人置身其中，既孤獨又閃耀，如未來的剪影。",
            slideUrl: "/",
            slideTags: ["Glass", "Futuristic", "Editorial", "Architecture"],
            slideImg: cyber4,
        },
    ];
    gsap.registerPlugin(useGSAP, SplitText);
    useGSAP(() => {
        const totalSlides = slides.length;

        let currentSlide = 1;

        let isAnimating = false;
        let scrollAllowed = true;
        let lastScrollTime = 0;

        function creatSlide(slideIndex: number) {
            // 取得對應索引的 slide 資料（因陣列從 0 開始，所以要 -1）
            const slideData = slides[slideIndex - 1];

            // 建立 slide 外層容器
            const slide = document.createElement("div");
            slide.className = "slide";

            // 建立圖片容器
            const slideImg = document.createElement("div");
            slideImg.className = "slide-img";

            // 建立 <img> 並指定來源與替代文字
            const img = document.createElement("img");
            img.src = slideData.slideImg; // 注意：這裡 slides 陣列要有 slideImg 欄位
            img.alt = "";
            slideImg.appendChild(img);

            // 建立 slide header 區塊（標題、描述、連結）
            const slideHeader = document.createElement("div");
            slideHeader.className = "slide-header";

            // 建立 slide title 區塊
            const slideTitle = document.createElement("div");
            slideTitle.className = "slide-title";

            // 建立標題文字 <h1>
            const h1 = document.createElement("h1");
            h1.textContent = slideData.slideTitle;
            slideTitle.appendChild(h1);

            // 建立描述區塊
            const slideDescription = document.createElement("div");
            slideDescription.className = "slide-description";
            const p = document.createElement("p");
            p.textContent = slideData.slideDescription;
            slideDescription.appendChild(p);

            // 建立連結區塊
            const slideLink = document.createElement("div");
            slideLink.className = "slide-link";
            const a = document.createElement("a");
            a.href = slideData.slideUrl;
            a.textContent = "View Project";
            slideLink.appendChild(a);

            // 將標題、描述、連結加入 slideHeader
            slideHeader.appendChild(slideTitle);
            slideHeader.appendChild(slideDescription);
            slideHeader.appendChild(slideLink);

            // 建立 slide info 區塊（Tags + Index）
            const slideInfo = document.createElement("div");
            slideInfo.className = "slide-info";

            // 建立標籤區塊
            const slideTags = document.createElement("div");
            slideTags.className = "slide-tags";

            // 加入 "Tags" 標籤文字
            const tagsLabel = document.createElement("p");
            tagsLabel.textContent = "Tags";
            slideTags.appendChild(tagsLabel);

            // 逐一加入 tags
            slideData.slideTags.forEach((tag) => {
                // ← 這裡應該改成 slideTags
                const tagP = document.createElement("p");
                tagP.textContent = tag;
                slideTags.appendChild(tagP);
            });

            // 建立索引顯示區塊
            const slideIndexWrapper = document.createElement("div");
            slideIndexWrapper.className = "slide-index-wrapper";

            // 當前索引
            const slideIndexCopy = document.createElement("p");
            slideIndexCopy.textContent = slideIndex.toString().padStart(2, "0");

            // 分隔符號
            const slideIndexSeparator = document.createElement("p");
            slideIndexSeparator.textContent = "/";

            // 總數
            const slideTotalCount = document.createElement("p");
            slideTotalCount.textContent = totalSlides.toString().padStart(2, "0");

            // 把索引元素組合起來
            slideIndexWrapper.appendChild(slideIndexCopy);
            slideIndexWrapper.appendChild(slideIndexSeparator);
            slideIndexWrapper.appendChild(slideTotalCount);

            // slideInfo 組合：Tags + Index
            slideInfo.appendChild(slideTags);
            slideInfo.appendChild(slideIndexWrapper);

            // 最後組裝 slide：圖片 + header + info
            slide.appendChild(slideImg);
            slide.appendChild(slideHeader);
            slide.appendChild(slideInfo);

            // 回傳整個 slide 元素
            return slide;
        }

        function splitText(slide: HTMLElement) {
            const slideHeader = slide.querySelector(".slide-title h1");

            if (slideHeader) {
                SplitText.create(slideHeader, {
                    type: "words",
                    wordsClass: "word",
                    mask: "words",
                    autoSplit: true,
                    smartWrap: true,
                });
            }

            const slideContent = slide.querySelectorAll("p, a");
            slideContent.forEach((element) => {
                SplitText.create(element, {
                    type: "lines",
                    linesClass: "line",
                    mask: "lines",
                    reduceWhiteSpace: false,
                });
            });
        }

        function animateSlide(direction: "down" | "up") {
            if (isAnimating || !scrollAllowed) return;

            isAnimating = true;
            scrollAllowed = false;

            const slider = document.querySelector(".slider");
            const currentSlideElement = slider?.querySelector(".slide");

            if (direction === "down") {
                currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
            } else {
                currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
            }

            const exitY = direction === "down" ? "-200vh" : "200vh";
            const entryY = direction === "down" ? "100vh" : "-100vh";

            const entryClipPath =
                direction === "down"
                    ? "polygon(20% 20%, 80% 20%, 80% 100%, 20% 100%)"
                    : "polygon(20% 0%, 80% 0%, 80% 80%, 20% 80%)";

            // 創建新的 slide
            const newSlide = creatSlide(currentSlide);

            // 設定新 slide 的初始狀態
            gsap.set(newSlide, {
                y: entryY,
                clipPath: entryClipPath,
                transformPerspective: 500,
            });

            // 將新 slide 添加到 slider 中
            slider?.appendChild(newSlide);

            // 處理文字分割
            splitText(newSlide);

            const words = newSlide.querySelectorAll(".word");
            const lines = newSlide.querySelectorAll(".line");

            gsap.set([...words, ...lines], {
                y: "100%",
                transformPerspective: 500,
            });

            // 同時進行舊 slide 退出和新 slide 進入動畫
            const masterTL = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                    setTimeout(() => {
                        scrollAllowed = true;
                        lastScrollTime = Date.now();
                    }, 100);
                },
            });

            // 舊 slide 退出動畫
            if (currentSlideElement) {
                masterTL.to(
                    currentSlideElement,
                    {
                        scale: 0.25,
                        autoAlpha: 0,
                        // opacity: 0,
                        rotation: 30,
                        y: exitY,
                        duration: 2,
                        ease: "power4.inOut",
                        transformPerspective: 500,
                        onComplete: () => {
                            currentSlideElement?.remove();
                        },
                    },
                    0
                );
            }

            // 新 slide 進入動畫
            masterTL.to(
                newSlide,
                {
                    y: 0,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 2,
                    ease: "power4.inOut",
                    transformPerspective: 500,
                },
                0.75
            );

            // 文字動畫
            const headerWords = newSlide.querySelectorAll(".slide-title .word");
            if (headerWords.length > 0) {
                masterTL.to(
                    headerWords,
                    {
                        y: "0%",
                        duration: 1,
                        ease: "power4.inOut",
                        stagger: 0.1,
                        transformPerspective: 500,
                    },
                    0.75
                );
            }

            const tagsLines = newSlide.querySelectorAll(".slide-tags .line");
            if (tagsLines.length > 0) {
                masterTL.to(
                    tagsLines,
                    {
                        y: "0%",
                        duration: 1,
                        ease: "power4.inOut",
                        stagger: 0.1,
                    },
                    "-=0.75"
                );
            }

            const indexLines = newSlide.querySelectorAll(".slide-index-wrapper .line");
            if (indexLines.length > 0) {
                masterTL.to(
                    indexLines,
                    {
                        y: "0%",
                        duration: 1,
                        ease: "power4.inOut",
                        stagger: 0.1,
                    },
                    "<"
                );
            }

            const descriptionLines = newSlide.querySelectorAll(".slide-description .line");
            if (descriptionLines.length > 0) {
                masterTL.to(
                    descriptionLines,
                    {
                        y: "0%",
                        duration: 1,
                        ease: "power4.inOut",
                        stagger: 0.1,
                    },
                    "-=1"
                );
            }

            const linkLines = newSlide.querySelectorAll(".slide-link .line");
            if (linkLines.length > 0) {
                masterTL.to(
                    linkLines,
                    {
                        y: "0%",
                        duration: 1,
                        ease: "power4.inOut",
                    },
                    1.5
                );
            }
        }

        function handleScroll(direction: "down" | "up") {
            const now = Date.now();

            if (isAnimating || !scrollAllowed) return;
            if (now - lastScrollTime < 1000) return;

            lastScrollTime = now;
            animateSlide(direction);
        }

        window.addEventListener(
            "wheel",
            (e) => {
                e.preventDefault();
                const direction = e.deltaY > 0 ? "down" : "up";
                handleScroll(direction);
            },
            {
                passive: false,
            }
        );

        let touchStartY = 0;
        let isTouchActive = false;

        window.addEventListener(
            "touchstart",
            (e) => {
                touchStartY = e.touches[0].clientY;
                isTouchActive = true;
            },
            {
                passive: false,
            }
        );

        window.addEventListener(
            "touchmove",
            (e) => {
                e.preventDefault();
                if (!isTouchActive || isAnimating || !scrollAllowed) return;

                const touchCurrentY = e.touches[0].clientY;
                const difference = touchStartY - touchCurrentY;

                if (Math.abs(difference) > 50) {
                    isTouchActive = false;
                    const direction = difference > 0 ? "down" : "up";
                    handleScroll(direction);
                }
            },
            {
                passive: false,
            }
        );
        window.addEventListener("touchend", () => {
            isTouchActive = false;
        });
    }, {});

    return (
        <div className="slider">
            <div className="slide">
                <div className="slide-img">
                    <img src={cyber1} alt="" />
                </div>
                <div className="slide-header">
                    <div className="slide-title">
                        <h1>Monochrome Signal</h1>
                    </div>
                    <div className="slide-description">
                        <p>黑白之間的對比，像是一種隱喻，將時尚的冷冽感與身份的銳利邊界同時展現。</p>
                    </div>
                    <div className="slide-link">
                        <a href="#">View project</a>
                    </div>
                </div>
                <div className="slide-info">
                    <div className="slide-tags">
                        <p>tags</p>
                        <p>Monochrome</p>
                        <p>Editorial</p>
                        <p>Fashion</p>
                        <p>Visual Identity</p>
                    </div>
                    <div className="slide-index-wrapper">
                        <p id="slide-index">01</p>
                        <p>/</p>
                        <p id="total-slide-count">04</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
