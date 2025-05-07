
// npm install -D tailwindcss// 📦 PomodoroBox
// ├─ 📝 input (ввод задачи)
// ├─ ⏳ таймер (25 минут)
// ├─ 🟩 кнопка "Получить кубик"

import './PomadoroBox.css'
import PomadoroTimer from "./PomadoroTimer.jsx";

export default function PomadoroBox() {
    return (
        <div className="flex flex-col gap-2">

            <label htmlFor="name">Введи название задачи над которой ты работаешь</label>

            <input
                className="inputText"
                type="text"
                maxLength="25"
            />
            <PomadoroTimer></PomadoroTimer>

        </div>
    )
}