// для новичков проще использовать функции вместо классов
// будет 2 варианта и будем писать на классах, т.к. писать без них - странно

// export function createMessage(message){
//     return message
// }
// Придётся дублировать функции

//В классах мы можем сколько угодно методов прописывать
export class BackService{
    createMessage(message){
        return message
    }
}
