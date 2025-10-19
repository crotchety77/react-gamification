// PomadoroTitle.jsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./PomadoroCoubDone.css"

export default function PomadoroTitle({ title, startTime, endTime, targetRef }) {
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    // Форматирование времени
    function formatTime(ms) {
        const date = new Date(ms);
        if (isNaN(date.getTime())) return " ";
        return date.toLocaleTimeString("ru-RU", { hour12: false });
    }

    const displayStart =
        startTime && endTime && startTime !== endTime ? formatTime(startTime) : " ";

    useEffect(() => {
        if (!targetRef.current) return;
        const rect = targetRef.current.getBoundingClientRect();

        setCoords({
            top: rect.top - 50, // позиция тултипа над кубиком
            left: rect.left + rect.width / 2,
        });
    }, [targetRef]);

    return createPortal(
        <div
            className="coub-title"
            style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                transform: "translateX(-50%) scale(1)",
                zIndex: 9999,
            }}
        >
            {title}

            {startTime && endTime && (
                <div className="text-sm opacity-70 mt-1 whitespace-nowrap">
                    🕒 {displayStart} – {formatTime(endTime)}
                </div>
            )}
        </div>,
        document.body
    );
}
