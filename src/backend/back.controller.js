import { Router } from "express";
import { BackService } from "./back.service.js";

const router = Router()

const backService = new BackService()

// есть уже rootовый путь /messages
router.post('/', (req, res) => {
    const message = backService.createMessage(req.body)
    res.status(201).json(message)
})

export const backRouter = router   