import PomadoroTitle from "./PomadoroTitle.jsx";
// import { useState } from "react";
import './PomadoroCoubDone.css'
import { useRef } from "react";
import { colorizeSvg } from './SvgToColor.js';
import svgContent from './PixelBlock.svg?raw'; // импортируем SVG как строку
import { getPomodoroById } from './getPomodoroById.js'; //

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



export default function PomadoroCoubDone({ title, color, onDelete, startTime, endTime, id, focusedId, setFocusedId, setInputDescription }) {

    const isFocused = focusedId === id;
    const cubeRef = useRef(null); // Для работы Tooltip


    // Роль: отдельный кубик (компонент), отображающий завершённую задачу.
    return (
        <div
            ref={cubeRef} // Для работы Tooltip

            className="cube" // Для CSS

            onMouseEnter={() => setFocusedId(id)}
            onMouseLeave={() => setFocusedId(null)}

            // --------------------------------------------------

            onClick={async () => {
                setFocusedId(id);
                try {
                    const data = await getPomodoroById(id);
                    setInputDescription(data.description || "");
                } catch {
                    setInputDescription("Ошибка загрузки");
                }
            }}

            // --------------------------------------------------

        >
            {/* SVG с градиентным pixel art блоком */}
            <ColorSvg svgContent={svgContent} color={color}/>

            {/* Символ поверх SVG */}
            <span className={"cube__icon"} >
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

                className="delete-button"
                style={{ "--btn-color": color }} // ← передаём цвет через CSS-переменную

            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--btn-color)" // ← используем ту же переменную
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="6" y1="6" x2="18" y2="18"/>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                </svg>
            </button>
        </div>
    );
}
