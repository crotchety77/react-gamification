import express from 'express'
import FileUploader from 'express-fileupload' // подержка загрузки изображений
import {sequelize} from "./db.postgres.js"
import {User,Project,Pomodoro,Note,Item,ItemFeature,ItemFeatureTag,ProjectItem} from "./db.models.js"
import cors from "cors"
import router from "./routes/index.js"
import {handleErrorHandlingMiddleware} from "./middleware/ErrorHandlingMiddleware.js"
import path from "path";

const app = express();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());
app.use(FileUploader({ useTempFiles: true })); // <--- до /api
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);                        // <--- после всех парсеров

// Замыкающий. Обработка ошибок
app.use(handleErrorHandlingMiddleware) // должен регистрироваться в самом конце

app.get('/', (req, res) => {
    res.status(200).json({message:"Welcome to the server"})
})


const PORT = process.env.PORT || 3000;

const start = async () => {
    try {

        try {
            await sequelize.authenticate();
            console.log('✅ Подключение к базе успешно!');
        } catch (error) {
            console.error('❌ Ошибка подключения к базе данных:');
            console.error(error.message);
        }
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch(e){
        console.error(e);
    }
}

start();