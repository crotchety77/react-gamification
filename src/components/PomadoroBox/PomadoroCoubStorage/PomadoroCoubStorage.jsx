import { useState, useEffect } from "react";
import PomadoroTimer from "../PomadoroTimer.jsx";
import PomadoroCoubDone from "../PomadoroCoub/PomadoroCoubDone.jsx";
import PomadoroViewSession from "../PomadoroViewSession/PomadoroViewSession.jsx";

export default function PomadoroCoubStorage() {
    const [status, setStatus] = useState(""); // для сообщений об ошибках или успехе на бэке при сохранении помидорок
    const COLORS = ["#35ca86", "#ff7f50", "#6a5acd", "#ffa500", "#20b2aa", "#ff69b4", "#4682b4", "#a52a2a"];
    const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

    // Передам их из Таймера
    const [lastStart, setLastStart] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [lastEnd, setLastEnd] = useState(null);

    const [coubList, setCoubList] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const sendTimeToCoub = (start, end) => {
        setLastStart(start);
        setLastEnd(end);
    };

    // Синхронизация с бэком при монтировании
    useEffect(() => {
        const fetchPomodoros = async () => {
            try {
                const res = await fetch("http://localhost:4200/api/pomodoro");
                const data = await res.json();
                setCoubList(data.map(p => ({ ...p, color: getRandomColor() })));
            } catch (err) {
                console.error("Ошибка при получении помидоров с бэка:", err);
                setStatus("❌ Не удалось загрузить помидоры");
            }
        };
        fetchPomodoros();
    }, []);

    // Функция собирает данные о выполненной сессии

    // Попыдка создать запрос на создание pomadoro на бэке
    const donePomodoro = async () => {
        if (!inputValue.trim()) {
            setStatus("❌ Название задачи не может быть пустым");
            // ✅ Только фронтенд: проверка ввода пользователя до отправки на сервер
            return;
        }

        const now = Date.now();

        // ------------------------- FRONTEND -------------------------
        // Этот объект используется для управления состоянием на фронте (например, сразу показать кубик)
        const newCoub = {
            title: inputValue,
            projectId: 1,
            startTime: lastStart ?? now, // ✅ frontend: текущее сохранённое время начала или "сейчас"
            endTime: lastEnd ?? now      // ✅ frontend: текущее сохранённое время окончания или "сейчас"
        };
        // ------------------------------------------------------------

        try {
            // ------------------------- BACKEND -------------------------
            // Отправка данных на сервер, чтобы они сохранились в базе
            const res = await fetch("http://localhost:4200/api/pomodoro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCoub)  // ✅ backend: данные для сохранения
            });

            const saved = await res.json(); // ✅ backend: ответ сервера с уже созданной записью (возможно с id)
            // ------------------------------------------------------------

            if (!res.ok) {
                setStatus(`❌ Ошибка сервера: ${saved.message}`);
                // ✅ frontend: выводим сообщение об ошибке пользователю
                return;
            }

            // ------------------------- FRONTEND -------------------------
            // Добавляем только что созданный "кубик" в список для отображения на странице
            // Здесь уже можно добавить frontend-поля, которых нет на сервере, например цвет
            setCoubList(prev => [...prev, { ...saved, color: getRandomColor() }]); // отображение только на фронте, а то иначе ничего не будет появляться при создании
            setInputValue("");            // ✅ frontend: очистка поля ввода
            sendTimeToCoub(null, null);   // ✅ frontend: сброс таймера
            setStatus("✅ Помидор успешно создан"); // ✅ frontend: уведомление пользователя
            // ------------------------------------------------------------

        } catch (err) {
            console.error("Ошибка при сохранении в БД:", err);
            setStatus("❌ Ошибка при соединении с сервером");
            // ✅ frontend: обработка ошибки соединения
        }
    };

    const deleteCoub = async (id) => {
        try {
            const res = await fetch(`http://localhost:4200/api/pomodoro/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                const err = await res.json();
                console.error("Ошибка при удалении:", err.message);
                return;
            }

            // Удаляем из локального состояния
            setCoubList(prev => prev.filter(coub => coub.id !== id));
        } catch (err) {
            console.error("Ошибка при соединении с сервером:", err);
        }
    };

    return (


        <div className="flex flex-col gap-2 items-center">
            status && <label className="text-sm text-red-500">{status}</label>

            <label htmlFor="name">Введи название задачи:</label>
            <input
                className="inputText max-w-[300px] w-full"
                type="text"
                maxLength="1000"
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
                        startTime={coub.startTime}
                        endTime={coub.endTime}
                        onDelete={() => deleteCoub(coub.id)}
                    />
                ))}
            </div>

            <PomadoroViewSession></PomadoroViewSession>


            {/* Передаём коллбек в таймер */}
            <PomadoroTimer sendTimeToCoub={sendTimeToCoub} />

        </div>
    );
}