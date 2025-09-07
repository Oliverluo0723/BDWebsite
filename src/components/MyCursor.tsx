import { useEffect, useRef } from "react";

export default function MyCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = (cursorRef.current as HTMLElement) || null;
        if (!cursor) return;

        function moveCursor(e: MouseEvent) {
            const x = e.clientX;
            const y = e.clientY;

            cursor.style.left = x - 8 + "px";
            cursor.style.top = y - 8 + "px";
        }

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <div ref={cursorRef} className="hidden lg:block w-4 h-4 rounded-full bg-black fixed pointer-events-none z-50" />
    );
}
