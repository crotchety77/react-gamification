import {Project} from "../db.models.js";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import {ApiError} from "../error/ApiError.js"

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ProjectController {
    async create(req, res, next) {
        try {
            const { title, goal, color, userId } = req.body;
            const { icon } = req.files;
            let fileName = uuidv4() + ".png"
            icon.mv(path.resolve(__dirname, '..', 'static', fileName));

            if (!userId) {
                return res.status(400).json({ message: "userId обязателен" });
            }

            const project = await Project.create({ userId: Number(userId), title, goal, color, icon: fileName});

            return res.json(project);
        } catch (e) {
            next(ApiError.badRequest(e.message))
            console.error("Ошибка при создании проекта:", e);
            return res.status(500).json({ message: e.message });
        }
    }
    async getAll(req, res) {
        try {
            const { title } = req.query
            let projects;
            if(!title) {
                projects = await Project.findAll();
            }
            return res.json(projects)
        } catch (e) {
            console.error("Ошибка в getAll:", e);
            return res.status(500).json({ message: e.message });
        }
        // try {
        //     const projects = await Project.findAll();
        //     return res.json(projects);
        // } catch (e) {
        //     console.error("Ошибка в getAll:", e);
        //     return res.status(500).json({ message: e.message });
        // }
    }
    async getOne(req, res) {
        try {
            const projects = await Project.findAll();
            return res.json(projects);
        } catch (e) {
            console.error("Ошибка в getAll:", e);
            return res.status(500).json({ message: e.message });
        }
    }
}

