import { Router } from "express";

const pomodoroRouter = new Router()
import { PomodoroController } from '../controllers/pomodoroController.js'
const pomodoroController = new PomodoroController()

// userRouter.post('/registration',)
pomodoroRouter.post('/', pomodoroController.create);
pomodoroRouter.get('/', pomodoroController.getAll)
pomodoroRouter.delete('/:id', pomodoroController.delete); // <--- новый маршрут

pomodoroRouter.get('/:id', pomodoroController.getOne); // в TextArea Description



export default pomodoroRouter

