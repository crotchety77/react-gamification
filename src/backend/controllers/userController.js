import {User} from "../db.models.js";
import {ApiError} from "../error/ApiError.js"


export class UserController {
    async register(req, res, next) {

        try {
            const {username,email,password} = req.body;


            if (!password) {
                return res.status(400).json({ message: "password обязателен" });
            }

            const user = await User.create({username,email,password });

            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message))
            console.error("Ошибка при создании пользователя:", e);
            return res.status(500).json({ message: e.message });
        }

    }

    async login(req, res) {}

    async check(req, res, next) {
        // res.json('myaw')

        // api/user/auth?id=5&message=asdk
        // {"id":"5","message":"asdk"}
        // const query = req.query;
        // res.json(query)

        const {id} = req.query;
        if (!id){
            return next(ApiError.badRequest('Не задан id'));
        }
        res.json(id);
    }

}
