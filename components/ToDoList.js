import React, { useState } from 'react';
import { AiOutlineDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { ImCheckboxUnchecked } from "react-icons/im";


 export default function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = inputValue;
            setTodos(updatedTodos);
            setEditIndex(null);
        } else {
            setTodos([...todos, inputValue]);
        }
        setInputValue('');
    }

    function handleEdit(index) {
        setInputValue(todos[index]);
        setEditIndex(index);
    }

    function handleCheck(index) {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
    }

    function handleDelete(index) {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        // Remove the corresponding checked status
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems.splice(index, 1);
        setCheckedItems(updatedCheckedItems);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button type="submit">{editIndex !== null ? 'Edit Todo' : 'Add Todo'}</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span style={{ textDecoration: checkedItems[index] ? 'line-through' : 'none' }}>{todo}</span>
                        <button onClick={() => handleEdit(index)}><AiFillEdit style={{ color: 'blue' }}/></button>
                        <button onClick={() => handleCheck(index)}>{checkedItems[index] ?
                            <ImCheckboxUnchecked style={{ color: 'green' }} /> : <AiOutlineCheck style={{ color: 'green' }}/>} </button>
                        <button onClick={() => handleDelete(index)}><AiOutlineDelete style={{ color: 'red' }}/></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}





