import express from 'express'
import { backRouter } from './src/backend/back.controller.js';

const app = express()

async function main() {

    // Поддержка работы с json на бэке
    app.use(express.json());

    // В handlere принимается реквест и респонс
    // req - запрос
    // response - ответ
    // работает и app.get/post/all

    // app.use('/api/messages', (req, res) => {
    //     // сразу вернём json 
    //     res.status(200).json({
    //         message: "Успешно"
    //     })
    //     // Возвращаем статус ошибки
    // })    

    app.use('/api/messages', backRouter)
    
    // Запуск сервера
    // Порт по привычке у автора 4200 или 5000
    app.listen(4200, () => {
        console.log('Сервер запущен')
    })
}

main();

// VSCode расширение для restAPI клайандев
// Insomnia
// Postman
// Bruno