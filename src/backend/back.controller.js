import { Router } from "express";
import { BackService } from "./back.service.js";
import { authMiddleware } from "./back.middleware.js";

const router = Router()

const backService = new BackService()

// есть уже rootовый путь /messages
// добавили прослойку authMiddleware
router.post('/', authMiddleware, (req, res) => {
    console.log(req.query);
    // В контроллере прописываем все условия
    if (!req.body?.text?.length){
        return res.status(400).json({message: 'Необходим текст в поле text'})
    }

    const message = backService.createMessage(req.body)
    res.status(201).json(message)
})

export const backRouter = router
