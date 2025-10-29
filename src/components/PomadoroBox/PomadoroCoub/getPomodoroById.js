// api/pomodoro.js

// Для того чтобы получить информацию об одном помидоре

// api/pomodoro.js
export async function getPomodoroById(id) {
    const res = await fetch(`http://localhost:4200/api/pomodoro/${id}`);

    // Обработка ошибки сразу
    if (!res.ok) {
        // Попытка прочитать JSON, если сервер вернул сообщение
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Ошибка запроса");
    }

    // Возвращаем данные сразу
    return res.json();
}