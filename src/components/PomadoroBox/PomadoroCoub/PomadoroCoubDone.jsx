import PomadoroTitle from "./PomadoroTitle.jsx";
import { useState } from "react";
import './PomadoroCoubDone.css'

export default function PomadoroCoubDone({ title, color, onDelete, timeTask }) {
    const [showInfo, setShowInfo] = useState(false);



    // Роль: отдельный кубик (компонент), отображающий завершённую задачу.
    return (


        <div
            style={{
                width: "60px",
                height: "60px",
                backgroundColor: color,
                margin: "5px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    cursor: "pointer"
                }}
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
        >

            <span style={{ fontSize: "12px", color: "#fff", textAlign: "center" }}>♥</span>

            {showInfo && <PomadoroTitle title={title} timeTask={timeTask} />}
            {/*<PomadoroTitle title={title} timeTask={timeTask} />*/}


            <button
                    onClick={onDelete}
                    style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        background: "",
                        color: "white",
                        border: "none",
                        borderRadius: "30%",
                        width: "16px",
                        height: "16px",
                        fontSize: "5px",
                        cursor: "pointer"
                    }}
                >
                    ×
                </button>
            </div>

    )
}