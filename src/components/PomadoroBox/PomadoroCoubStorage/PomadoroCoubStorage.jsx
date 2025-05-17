import { useState, useEffect } from "react";
import PomadoroTimer from "../PomadoroTimer.jsx";
import PomadoroCoubDone from "../PomadoroCoub/PomadoroCoubDone.jsx";

export default function PomadoroCoubStorage() {
    const COLORS = ["#35ca86", "#ff7f50", "#6a5acd", "#ffa500", "#20b2aa", "#ff69b4", "#4682b4", "#a52a2a"];
    const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

    // Передам их из Таймера
    const [lastStart, setLastStart] = useState(null);
    const [lastEnd, setLastEnd] = useState(null);

    const [coubList, setCoubList] = useState(() => {
        const stored = localStorage.getItem("pomadoro-coubs");
        return stored ? JSON.parse(stored) : [];
    });

    const [inputValue, setInputValue] = useState("");


    useEffect(() => {
        localStorage.setItem("pomadoro-coubs", JSON.stringify(coubList));
    }, [coubList]);

    const sendTimeToCoub = (start, end) => {
        setLastStart(start);
        setLastEnd(end);
    };

// Функция собирает данные о выполненной сессии
    const donePomodoro = () => {
        if (!inputValue.trim()) return;

        const now = Date.now();

        const newCoub = {
            title: inputValue,
            id: now,
            color: getRandomColor(),
            timeTask: {
                start: lastStart ?? " ",  // если lastStart = null — ставим now
                end: lastEnd ?? now,      // если lastEnd = null — ставим now
            },
        };

        sendTimeToCoub(null, null); // обнуляем время
        setCoubList((prev) => [...prev, newCoub]);
        setInputValue("");
    };

    const deleteCoub = (id) => {
        setCoubList(prev => prev.filter(coub => coub.id !== id));
    };

    return (
        <div className="flex flex-col gap-2 items-center">


            <label htmlFor="name">Введи название задачи:</label>
            <input
                className="inputText max-w-[300px] w-full"
                type="text"
                maxLength="100"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />




            <button onClick={donePomodoro} className="buttonCoub max-w-[200px] w-full">💟 Создать кубик</button>





            <div className="flex flex-wrap mt-5 max-w-[500px] transition-all duration-300">
                {coubList.map((coub) => (
                    <PomadoroCoubDone
                        key={coub.id}
                        title={coub.title}
                        color={coub.color}
                        timeTask={coub.timeTask}
                        onDelete={() => deleteCoub(coub.id)}

                    />
                ))}
            </div>

            {/* Передаём коллбек в таймер */}
            <PomadoroTimer sendTimeToCoub={sendTimeToCoub} />
        </div>
    );
}
