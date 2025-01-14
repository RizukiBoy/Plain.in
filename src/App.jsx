// src/App.js
import React from 'react';
import TaskList from './components/TaskList';


const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 bg-white shadow shadow-lg font-sans">
        <TaskList />
      </div>
    </div>
  );
};

export default App;
