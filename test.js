import { DATA } from "./serviceTest.js";

// Раньше не было поддержки ES модуля на Бэке
// Раньше делали так:
// ! убери type: "module" in package.json
// const { DATA } = require('./serviceTest.js')
// require() / module.exports — это синтаксис CommonJS. Работал всегда.
//import / export — это ECMAScript Modules (ESM), современный стандарт (как в браузере).



console.log(DATA.link);