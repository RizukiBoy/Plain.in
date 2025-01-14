// src/components/TaskItem.js
import React from 'react';

const TaskItem = ({ task }) => {
  console.log(task)
  return (
    <div className="bg-teal shadow-md rounded-xl p-4 flex justify-between items-center mb-2">
          <div>
          <div>
              <h3>{task.title}</h3>
              <p>{task.dueDate}</p>
          </div>

          </div>
    </div>
  );
};

export default TaskItem;
