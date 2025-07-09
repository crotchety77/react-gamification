import {Pomodoro} from "../db.models.js";
import {ApiError} from "../error/ApiError.js"

export class PomodoroController {
    async create(req, res) {
        try {
            console.log("Получен запрос на создание помидора:", req.body);
            const { title, projectId } = req.body;

            if (!projectId) {
                return res.status(400).json({ message: "projectId обязателен" });
            }

            const pomodoro = await Pomodoro.create({
                title,
                projectId: Number(projectId),
            });

            return res.json(pomodoro);
        } catch (e) {
            console.error("Ошибка при создании помидора:", e);
            return res.status(500).json({ message: e.message });
        }
    }
    async getAll(req, res) {
        try {
            const pomodoros = await Pomodoro.findAll();
            return res.json(pomodoros);
        } catch (e) {
            console.error("Ошибка в getAll:", e);
            return res.status(500).json({ message: e.message });
        }
    }
}