
// npm install -D tailwindcss// 📦 PomodoroBox
// ├─ 📝 input (ввод задачи)
// ├─ ⏳ таймер (25 минут)
// ├─ 🟩 кнопка "Получить кубик"

import './PomadoroBox.css'
import PomadoroTimer from "./PomadoroTimer.jsx";
import PomadoroCoubStorage from "./PomadoroCoubStorage/PomadoroCoubStorage.jsx";

export default function PomadoroBox() {
    return (
        <div className="flex flex-col gap-2">



            <PomadoroCoubStorage></PomadoroCoubStorage>

        </div>
    )
}