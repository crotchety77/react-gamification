// api/pomodoro.js
export async function fetchPomodoros() {
    const res = await fetch("http://localhost:4200/api/pomodoro");
    if (!res.ok) throw new Error("Ошибка загрузки");
    return res.json();
}

export async function createPomodoro(data) {
    try {
        const res = await fetch("http://localhost:4200/api/pomodoro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const saved = await res.json().catch(() => ({}));

        if (!res.ok) {
            throw new Error(saved.message || "Ошибка сервера");
        }

        return saved;
    } catch (err) {
        console.error("Ошибка при сохранении помидора:", err);
        throw err;
    }
}

export async function deletePomodoro(id) {
    const res = await fetch(`http://localhost:4200/api/pomodoro/${id}`, { method: "DELETE" });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Ошибка удаления");
    }
}
