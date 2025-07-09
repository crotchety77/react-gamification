import { Router } from "express";

const projectRouter = new Router()
import { ProjectController } from '../controllers/projectController.js'
const projectController = new ProjectController()

// userRouter.post('/registration',)
projectRouter.post('/', projectController.create);
projectRouter.get('/', projectController.getAll);
projectRouter.get(':id', projectController.getOne);



export default projectRouter

