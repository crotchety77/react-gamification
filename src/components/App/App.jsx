import { useState } from "react";
import LeftPage from "../LeftPage/LeftPage.jsx";
import RightPage from "../RightPage/RightPage.jsx";
import Tabs from "../Tabs/Tabs.jsx";
import './App.css'


export default function App() {
    // 🧠 Состояние правой страницы — что сейчас открыто
    const [rightPage, setRightPage] = useState(null); // ← стартуем с пустоты!
  
    return (
      <div className="app-wrapper">
        {/* Левая страница — фиксированная */}
        <div className="left-page">
          <LeftPage />
        </div>
  
        {/* Правая страница — живёт по выбранному модулю */}
        <div className="right-page">
          <RightPage currentModule={rightPage} />
        </div>
  
        {/* Закладки как цветные магические прямоугольники */}
        <Tabs onSelect={setRightPage} />
      </div>
    );
  }