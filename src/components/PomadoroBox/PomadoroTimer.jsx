import "./PomadoroTimer.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCallback } from "react";

export default function PomadoroTimer() {

    const [duration, setDuration] = useState(25 * 60 * 1000); // сколько длится таймер = 25 минут
    const [startAt, setStartAt] = useState(); // когда таймер стартовал (в миллисекундах)
    const [initialTimer, setInitialTimer] = useState(0); // сколько времени уже прошло, если была пауза



    const now = useNow(1000, startAt); // Каждую секунд обновляем StartAt

    const timeFromStart = now - (startAt ?? now);
    // startAt ?? now означает: "если startAt задан, используй его, иначе — now".
    // "Если таймер не запущен, пусть результат будет ноль." тогда now - now = 0.


    const timer = timeFromStart + initialTimer; //  сумма времени с текущего запуска и прошлого (если была пауза).
    const countDown = duration - timer; // обратный отсчёт!

    const secondsPassed = Math.floor(timer / 1000);
    const secondsLeft = Math.max(0, Math.ceil((duration - timer) / 1000));


    const toggleTimer = () => {
        if (startAt) {
            // Пауза
            setInitialTimer(timer); // сохраняем сколько прошло
            setStartAt(); // обнуляем старт → таймер не активен
        } else {
            setStartAt(Date.now());
        }
    };



    const resetTimer = useCallback(() => {
        setStartAt();
        setInitialTimer(0);
    }, []); // массив зависимостей пустой, значит функция не изменится


    const setPomodoro = (minutes) => {
        resetTimer();
        setDuration(minutes * 60 * 1000);
    };



    const isCountEnd = countDown <= 0;

    // Если isCountEnd стало true, и таймер был запущен — 🔔 звоним!
    useEffect(() => {
        if (isCountEnd && startAt) {
            alert("⏰ Время вышло!");
            resetTimer(); // можно убрать, если хочешь сохранить "завершённое" состояние
        }
    }, [isCountEnd, startAt, resetTimer]);

    return (
        <div>
            <div style={{marginBottom: "10px"}}>
                <button onClick={() => setPomodoro(25)}>🍅 25 мин</button>
                <button onClick={() => setPomodoro(5)}>☕ 5 мин</button>
                <button onClick={resetTimer}>🔁 Сброс</button>
            </div>

            <button onClick={toggleTimer}>{!startAt ? "▶️ Старт" : "⏸️ Пауза"}</button>

            <div style={{marginTop: "10px"}}>
                <div>Прошло: {formatTimeFromSeconds(secondsPassed)}</div>
                <div>Осталось: {formatTimeFromSeconds(secondsLeft)}</div>
            </div>
        </div>
    );
}

function formatTimeFromSeconds(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function useNow(updateInterval, enabled, cb) {
    const cbRef = useRef(cb);
    cbRef.current = cb;
    const [now, setNow] = useState(Date.now());

    useLayoutEffect(() => {
        if (!enabled) return;

        setNow(Date.now());
        cbRef.current?.(Date.now());

        const interval = setInterval(() => {
            setNow(Date.now());
            cbRef.current?.(Date.now());
        }, updateInterval);

        return () => clearInterval(interval);
    }, [updateInterval, enabled]);

    return now;
}
