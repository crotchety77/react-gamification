import { Router } from "express";

const router = new Router()

//создать
router.post('/', require('./routes/users'))
//получить
router.get('/', require('./routes/users'))



export default router
