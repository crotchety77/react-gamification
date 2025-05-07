import {useState} from "react";

export default function TestUseState() {
// Правильно
    const [name, setName] = useState({ name: 'andrey', email: 'andrey@example.com' });

    function handleNameChange(e) {
        const {name, value} = e.target;
        setName({...name, name: value}); // обновляем только name
    }


    return (
        <>
            <h2>[Введите имя]:</h2>
            <input name="name" onChange={handleNameChange} value={name.name}/>
            <h1>Привет, {name.name}!</h1>
        </>
    )
}