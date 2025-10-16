import { Router } from "express";
import userRouter from "./userRouter.js";
import pomodoroRouter from "./pomodoroRouter.js";
import projectRouter from "./projectRoutes.js"; // ✅ default import без фигурных скобок\

import { sequelize } from "../db.postgres.js";


const router = new Router()

router.use('/user', userRouter)
router.use('/pomodoro', pomodoroRouter)
router.use('/project', projectRouter)

// ✅ Добавляем тестовый маршрут для проверки БД
router.get("/status", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ ok: true, message: "База данных подключена" });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Ошибка при подключении к БД",
            error: error.message,
        });
    }
});

export default router
