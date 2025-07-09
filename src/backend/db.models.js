import sequelize from './db.postgres.js'
import { DataTypes } from 'sequelize'

// Пользователи
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING},
});

// Проекты
const Project = sequelize.define('project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    goal: { type: DataTypes.TEXT },
    color: { type: DataTypes.STRING },
    icon: { type: DataTypes.STRING }
});


// Помидоры
const Pomodoro = sequelize.define('pomodoro', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    startTime: { type: DataTypes.DATE },
    endTime: { type: DataTypes.DATE },
    description: { type: DataTypes.TEXT }
});


// Заметки
const Note = sequelize.define('note', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT }
});


// Предметы
const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    lore: { type: DataTypes.TEXT },
    level: { type: DataTypes.INTEGER }
});


// Характеристики предметов
const ItemFeature = sequelize.define('item_feature', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    featureText: { type: DataTypes.TEXT }
});


// Теги характеристик
const ItemFeatureTag = sequelize.define('item_feature_tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tagText: { type: DataTypes.STRING }
});


// Привязка предметов к проектам
const ProjectItem = sequelize.define('project_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    note: { type: DataTypes.TEXT }
});


// Users
User.hasMany(Project)
Project.belongsTo(User)

// Projects
Project.hasMany(Pomodoro)
Pomodoro.belongsTo(Project)

Project.hasMany(Note)
Note.belongsTo(Project)

Project.hasMany(ProjectItem)
ProjectItem.belongsTo(Project)

// Pomodoros, Notes – уже привязаны выше

// Items
Item.hasMany(ItemFeature)
ItemFeature.belongsTo(Item)

Item.hasMany(ProjectItem)
ProjectItem.belongsTo(Item)

// Item Features
ItemFeature.hasMany(ItemFeatureTag)
ItemFeatureTag.belongsTo(ItemFeature)


export {
    User,
    Project,
    Pomodoro,
    Note,
    Item,
    ItemFeature,
    ItemFeatureTag,
    ProjectItem
}