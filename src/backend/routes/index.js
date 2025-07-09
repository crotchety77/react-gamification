import { Router } from "express";
import userRouter from "./userRouter.js";
import pomodoroRouter from "./pomodoroRouter.js";
import projectRouter from "./projectRoutes.js"; // ✅ default import без фигурных скобок


const router = new Router()

router.use('/user', userRouter)
router.use('/pomodoro', pomodoroRouter)
router.use('/project', projectRouter)



export default router
