import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Trash from '../assets/trash.svg';


const TaskList = () => {

  // handle add task
  const getInitialTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const [tasks, setTasks ]= useState(getInitialTasks);
  const [draggedTask, setDraggedTask] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskEdit] = useState(null);
  

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }

  // handle delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  };

  // handle drag task
  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === draggedTask.id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
<div className="p-4">
      <TaskForm addTask={addTask} />
      <h1 className="text-xl font-bold mb-4">Task List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {['To Do', 'Doing', 'Done'].map((status) => (
          <div
            key={status}
            className={`rounded-lg min-h-[200px] m-2 flex flex-col ${
              status === 'To Do' ? 'bg-blue-100' : 
              status === 'Doing' ? 'bg-yellow-100' : 'bg-green-100'
            }`}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(status)}
          >
            <h2 className="text-lg font-bold m-2 ml-3">{status}</h2>
            {getTasksByStatus(status).map((task) => (
              <div
                key={task.id}
                className="w-[80%] mx-auto bg-white p-2 mb-2 rounded-lg shadow cursor-pointer"
                draggable
                onDragStart={() => handleDragStart(task)}
                onDoubleClick={() =>handleEditClick(task)}
              >
                <div>
                  <span className="flex justify-between">
                      <p className="text-teal-500 text-lg font-semibold">{task.title}</p>
                  </span>
                      <span className="flex items-center">
                      <p>deadline :</p>
                      <p className="text-xs mt-1 ml-2">{task.dueDate}</p>
                      </span>
                </div>

                <div className="flex justify-end">
                <button className="text-red-500 items-end" onClick={() => deleteTask(task.id)}><img src={Trash}></img></button>
                </div>


              </div>
            ))}
          </div>
        ))}
      </div>

      {taskToEdit && (
        <ModalBox
        task={taskToEdit}
        isOpen={isModalOpen}
        onClose={closeEditModal}
        onSave={editTask} />
      )}

    </div>
  );
};

export default TaskList;
