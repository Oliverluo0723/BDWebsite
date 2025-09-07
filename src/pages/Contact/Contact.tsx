import { useRevealer } from "@/hooks/useRevealer.tsx";

export default function Contact() {
    useRevealer();
    return (
        <>
            <div className="revealer"></div>
            <div className="mt-24">Contact</div>
        </>
    );
}
