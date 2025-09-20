import { useRevealer } from "@/hooks/useRevealer.tsx";

export default function Work() {
    useRevealer();
    return (
        <>
            <div className="revealer"></div>

            <h1>I am WorkPage</h1>
        </>
    );
}
