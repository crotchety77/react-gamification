import { Router } from "express";

const userRouter = new Router()
import { UserController } from '../controllers/userController.js'
const userController = new UserController()

// userRouter.post('/registration',)
userRouter.post('/registration', userController.register);



userRouter.post('/login', userController.login )


// Проверка авторизации
// JWT token
userRouter.get('/auth', userController.check)



export default userRouter

