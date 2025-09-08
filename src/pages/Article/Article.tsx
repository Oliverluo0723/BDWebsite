import { useRevealer } from "@/hooks/useRevealer.tsx";

export default function Article() {
    useRevealer();
    return (
        <>
            <div className="revealer"></div>
            <div className="w-full h-24"></div>
            <div>我是文章</div>
        </>
    );
}
