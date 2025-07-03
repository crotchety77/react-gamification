import express from 'express'
import { backRouter } from './src/backend/back.controller.js';
import dotenv from 'dotenv'

dotenv.config() // Подгрузка файла .env

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

    
    app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
    });
    // Запуск сервера
    // Порт по привычке у автора 4200 или 5000
    app.listen(process.env.PORT || 4200, () => {
        console.log('Сервер запущен')
    })
}

main();

// VSCode расширение для restAPI клайандев
// Insomnia
// Postman
// Bruno