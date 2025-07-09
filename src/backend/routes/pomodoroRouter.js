import { Router } from "express";

const pomodoroRouter = new Router()
import { PomodoroController } from '../controllers/pomodoroController.js'
const pomodoroController = new PomodoroController()

// userRouter.post('/registration',)
pomodoroRouter.post('/', pomodoroController.create);
pomodoroRouter.get('/', pomodoroController.getAll)




export default pomodoroRouter

