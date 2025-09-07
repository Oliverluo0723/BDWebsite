import { useRevealer } from "@/hooks/useRevealer.tsx";

export default function Contact() {
    useRevealer();
    return (
        <>
            <div className="revealer"></div>
            <div className="h-24"></div>
            <div>Contact</div>
        </>
    );
}
