import { useState, useEffect } from "react";
import PomadoroCoubDone from "../PomadoroCoub/PomadoroCoubDone.jsx";

export default function PomadoroCoubStorage() {
    const COLORS = ["#35ca86", "#ff7f50", "#6a5acd", "#ffa500", "#20b2aa", "#ff69b4", "#4682b4", "#a52a2a"];
    const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

    const [coubList, setCoubList] = useState(() => {
        const stored = localStorage.getItem("pomadoro-coubs");
        return stored ? JSON.parse(stored) : [];
    });

    const [inputValue, setInputValue] = useState("");


    useEffect(() => {
        localStorage.setItem("pomadoro-coubs", JSON.stringify(coubList));
    }, [coubList]);

    const donePomodoro = () => {
        if (!inputValue.trim()) return;
        const newCoub = {
            title: inputValue,
            id: Date.now(),
            color: getRandomColor() // 🔮 добавляем цвет!
        };
        setCoubList([...coubList, newCoub]);
        setInputValue(""); // очистка поля
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
                maxLength="25"
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
                        onDelete={() => deleteCoub(coub.id)}

                    />
                ))}
            </div>


        </div>
    );
}
