import PomadoroTitle from "./PomadoroTitle.jsx";
// import { useState } from "react";
import './PomadoroCoubDone.css'
import { useState, useRef } from "react";
import { colorizeSvg } from './SvgToColor.js';
import svgContent from './PixelBlock.svg?raw'; // импортируем SVG как строку

// Отдельный компонент для перекрашивания SVG
export function ColorSvg({ svgContent, color }) {
    const coloredSvg = colorizeSvg(svgContent, color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            style={{
                width: "100%",
                height: "100%",
                imageRendering: "pixelated",
                display: "block",
            }}
            dangerouslySetInnerHTML={{ __html: coloredSvg.replace(/<\?xml.*?\?>/, '') }}
        />
    );
}


export default function PomadoroCoubDone({ title, color, onDelete, startTime, endTime, id, focusedId, setFocusedId }) {

    const isFocused = focusedId === id;
    const cubeRef = useRef(null); // Для работы Tooltip

    // Роль: отдельный кубик (компонент), отображающий завершённую задачу.
    return (
        <div
            ref={cubeRef} // Для работы Tooltip

            style={{

                width: "60px",
                height: "60px",
                margin: "5px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
            }}
            onMouseEnter={() => setFocusedId(id)}
            onMouseLeave={() => setFocusedId(null)}
        >
            {/* SVG с градиентным pixel art блоком */}
            <ColorSvg svgContent={svgContent} color={color}/>

            {/* Символ поверх SVG */}
            <span
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "12px",
                    color: "#fff",
                    pointerEvents: "none",
                }}
            >
            ♥
        </span>

            {/* Всплывающая информация Tooltip*/}
            {isFocused && (
                <PomadoroTitle
                    title={title}
                    startTime={startTime}
                    endTime={endTime}
                    targetRef={cubeRef} // передаём ref для позиционирования
                />
            )}

            {/* Кнопка удаления */}
            <button
                onClick={onDelete}
                style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-4px",
                    width: "20px",
                    height: "20px",
                    background: "white",
                    color,
                    border: `2px solid ${color}`,
                    borderRadius: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    padding: 0,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        display: "block", // убирает baseline-смещение
                        shapeRendering: "crispEdges", // пиксельная точность
                    }}
                >
                    <line x1="6" y1="6" x2="18" y2="18"/>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                </svg>
            </button>
        </div>
    );
}
