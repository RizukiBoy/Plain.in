import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({addTask}) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

    if(!title ||!dueDate) return;


    const newTask = {
        id:uuidv4(),
        title,
        dueDate,
        status: "To Do"
    }

    console.log("New Task : ", newTask)
    addTask(newTask);

    setTitle('');
    setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
                <label className="block font-bold">Title: </label>

                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className="border border-blue-300 rounded px-2 py-1 w-full outline-none" required />
            </div>
            
            <div className="mb-2">
                <label className="block font-bold">Due Date:</label>
                <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border border-blue-300 rounded px-2 py-1 w-full outline-none"
                required
                />
            </div>

            <button type="submit" className="bg-blue-400 text-white py-1 px-4 rounded">
                Add Task
            </button>
        </form>

    )
}

export default TaskForm;
