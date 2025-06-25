import { useState } from "react";
import LeftPage from "../LeftPage/LeftPage.jsx";
import RightPage from "../RightPage/RightPage.jsx";
import Tabs from "../Tabs/Tabs.jsx";
import './App.css'


export default function  App() {


    // 🧠 Состояние правой страницы — что сейчас открыто
    const [rightPage, setRightPage] = useState(null); // ← стартуем с пустоты!

    return (
        <div className="relative flex w-full h-screen bg-gradient-to-br from-amber-50 to-stone-100 shadow-2xl rounded-lg overflow-hidden border-4 border-brown-600">
            {/* Левая страница — фиксированная */}
            <div className="w-1/2 border-r-2 border-brown-400 p-4 bg-yellow-50">
                <LeftPage />
            </div>

            {/* Правая страница — живёт по выбранному модулю */}
            <div className="w-1/2 p-4 bg-white">
                <RightPage currentModule={rightPage} />
            </div>

            {/* Закладки как цветные магические прямоугольники */}
            <Tabs onSelect={setRightPage} />
        </div>
    );
}
