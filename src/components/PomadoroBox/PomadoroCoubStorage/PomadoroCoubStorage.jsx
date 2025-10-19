import { useState, useEffect } from "react";
import PomadoroTimer from "../PomadoroTimer.jsx";
import PomadoroCoubDone from "../PomadoroCoub/PomadoroCoubDone.jsx";
import "./PomadoroCoubStorage.css"

export default function PomadoroCoubStorage() {
    const [status, setStatus] = useState(""); // для сообщений об ошибках или успехе на бэке при сохранении помидорок
    const COLORS = ["#35ca86", "#ff7f50", "#6a5acd", "#ffa500", "#20b2aa", "#ff69b4", "#4682b4", "#a52a2a"];
    const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
    const [focusedId, setFocusedId] = useState(null); // Для уведомления помидоров

    // Передам их из Таймера
    const [lastStart, setLastStart] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [lastEnd, setLastEnd] = useState(null);

    const [coubList, setCoubList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputDescription, setInputDescription] = useState("");

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
            description: inputDescription,
            projectId: 1,
            startTime: lastStart ?? now, // ✅ frontend: текущее сохранённое время начала или "сейчас"
            endTime: lastEnd ?? now,      // ✅ frontend: текущее сохранённое время окончания или "сейчас"
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
            setInputDescription(""); // Очистка данных
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
            {/*Статус для сохранения в бд и успешность операции создания*/}
            {status && <label className="text-sm text-red-500">{status}</label>}

            <label className="text-black" htmlFor="name">Введи название задачи:</label>

            <div className="flex gap-2 items-center">
                <input
                    className="inputText max-w-[300px] w-full"
                    type="text"
                    maxLength="1000"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <button onClick={donePomodoro} className="buttonCoub max-w-[100px] w-full">Создать</button>
            </div>


            <div className="flex gap-2 items-start w-full max-w-[900px] mx-auto mt-6 ">

                {/* Левая колонка */}
                <div className="flex flex-col w-1/2 scrollDescription">
                    <textarea
                        id="description"
                        className="inputText w-full min-h-[210px] resize-none p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                        maxLength="1000"
                        value={inputDescription}
                        onChange={(e) => setInputDescription(e.target.value)}
                        placeholder="Напиши подробнее о том чем вы занимались"
                    />
                </div>

                {/* Правая колонка */}
                <div
                    className="flex flex-col w-[345px] min-w-[345px] max-w-[345px] h-[210px] border border-gray-300 rounded-md p-3 overflow-y-auto scrollCoubs">
                    <div className="flex flex-wrap gap-2">
                        {coubList.length === 0 ? (
                            <p className="text-gray-400 text-sm italic">Пока ничего нет...</p>
                        ) : (
                            coubList.map((coub) => (
                                <PomadoroCoubDone
                                    key={coub.id}
                                    title={coub.title}
                                    color={coub.color}
                                    startTime={coub.startTime}
                                    endTime={coub.endTime}
                                    onDelete={() => deleteCoub(coub.id)}
                                    // Для уведомления сверху
                                    id={coub.id}                  // добавляем id
                                    focusedId={focusedId}         // текущее активное
                                    setFocusedId={setFocusedId}   // функция для смены фокуса
                                />
                            ))

                        )}
                    </div>
                </div>
            </div>


            {/* Передаём коллбек в таймер */}
            <PomadoroTimer sendTimeToCoub={sendTimeToCoub}/>

        </div>
    );
}