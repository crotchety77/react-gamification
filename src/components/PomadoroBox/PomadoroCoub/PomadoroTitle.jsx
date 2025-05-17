export default function PomadoroTitle({ title, timeTask }) {

    const { start, end } = timeTask || {};
    function formatTime(ms) {


        const date = new Date(ms);

        if (isNaN(date.getTime())) {
            return " ";
        }

        return date.toLocaleTimeString("ru-RU", { hour12: false }); // формат: HH:MM:SS
    }

    return (
        <div className="coub-title">
            {title}

            {timeTask?.start && timeTask?.end && (
                <div className="text-sm opacity-70 mt-1 whitespace-nowrap">
                    🕒 {formatTime(start)} – {formatTime(end)}
                </div>
            )}
        </div>


    )
}
