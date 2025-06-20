export default function PomadoroTitle({ title, timeTask }) {

    const { start, end } = timeTask || {};
    function formatTime(ms) {

        //const date = new Date(1718872100000);
        //Tue Jun 20 2024 14:15:00 GMT+0300 (Moscow Standard Time)
        const date = new Date(ms);
        // Это создаёт объект Date и мы его форматируем

        // Для старта, если его нет. Возвращем ПУСТОТУ
        if (isNaN(date.getTime())) {
            return " ";
        }

        return date.toLocaleTimeString("ru-RU", { hour12: false }); // формат: HH:MM:SS
    }

    return (

        <div className="coub-title">
            {title}

            {/*// {условие && <Компонент />}*/}
            {timeTask?.start && timeTask?.end && (
                <div className="text-sm opacity-70 mt-1 whitespace-nowrap">
                    🕒 {formatTime(start)} – {formatTime(end)}
                </div>
            )}
        </div>


    )
}
