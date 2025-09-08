// hooks
import { useRevealer } from "@/hooks/useRevealer.tsx";
// lottie
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import catLootie from "@/assets/lotties/cat.lottie";
export default function Article() {
    useRevealer();
    return (
        <>
            <div className="revealer"></div>
            <div className="w-full h-24"></div>
            <div className="w-48 h-48">
                <DotLottieReact src={catLootie} autoplay loop style={{ width: "100%", height: "100%" }} />
            </div>
        </>
    );
}
