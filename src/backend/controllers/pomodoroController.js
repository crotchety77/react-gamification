import {Pomodoro} from "../db.models.js";
import {ApiError} from "../error/ApiError.js"
import {DataTypes} from "sequelize";

export class PomodoroController {
    async create(req, res) {
        try {
            console.log("Получен запрос на создание помидора:", req.body); // <- здесь вывод о структуре нового элемента
            const { title, projectId, startTime, endTime } = req.body;

            if (!projectId) {
                return res.status(400).json({ message: "projectId обязателен" });
            }

            // .create(...) – это метод Sequelize
            const pomodoro = await Pomodoro.create({
                title,
                projectId: Number(projectId),
                startTime,
                endTime,
            });

            // Это отправка объекта обратно на фронтенд в формате JSON.
            console.log("Отправляем на фронт:", JSON.stringify(pomodoro, null, 2));
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

    // Удаление
    async delete(req, res) {
        try {
            const { id } = req.params;
            const pomodoro = await Pomodoro.findByPk(id);

            if (!pomodoro) {
                return res.status(404).json({ message: "Помидор не найден" });
            }

            await pomodoro.destroy();
            return res.json({ message: "Помидор удалён", id });
        } catch (e) {
            console.error("Ошибка при удалении помидора:", e);
            return res.status(500).json({ message: e.message });
        }
    }
}