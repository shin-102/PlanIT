import React, { useState } from 'react';
import { FaCheckSquare, FaMinus, FaPlus, FaSquare } from 'react-icons/fa'; // Import the plus icon

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date?: string; // Add date property
  tags?: string[]; // Add tags property
}

const Tasklist: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false); // State to toggle input visibility
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskTags, setNewTaskTags] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDate(event.target.value);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value.split(',').map(tag => tag.trim());
    setNewTaskTags(tags);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      setTasks(prevTasks => [
        ...prevTasks,
        {
          id: Date.now(),
          text: newTaskText,
          completed: false,
          date: newTaskDate,
          tags: newTaskTags,
        },
      ]);
      setNewTaskText('');
      setNewTaskDate('');
      setNewTaskTags([]);
      setIsAddingTask(false); // Hide the input form after adding
    }
  };

  const handleToggleTodo = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className=""> {/* Main container with dark background */}
      <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-white">Tasks List</h2>
        <button onClick={() => setIsAddingTask(!isAddingTask)} className="text-gray-400 border-[1px] border-blue-400/0 hover:border-blue-400/50 active:bg-blue-600 hover:text-gray-200"> {/* Plus button */}
          {isAddingTask ? <FaMinus /> : <FaPlus /> }
        </button>
      </div>

      {isAddingTask && ( // Conditionally render the input form
        <div className={`flex justify-evenly items-center mb-4 bg-gray-800/70 p-4 rounded-b-lg  ${isAddingTask ? 'shadow-[inset_0px_4px_10px_rgba(0,0,0,0.3)]' : ''}`}>
          <input
            type="text"
            className="p-2 mr-2 bg-gray-700 text-white rounded"
            placeholder="Add a new task"
            value={newTaskText}
            onChange={handleInputChange}
          />
          <input
            type="date"
            className="p-2 mr-2 bg-gray-700 text-white rounded"
            value={newTaskDate}
            onChange={handleDateChange}
          />
          <input
            type="text"
            className="p-2 mr-2 bg-gray-700 text-white rounded"
            placeholder="Tags (comma-separated)"
            value={newTaskTags.join(', ')}
            onChange={handleTagChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      )}

      <ul>
        {tasks.map(task => (
          <li key={task.id} 
            className={`flex items-center justify-between px-2 py-4 my-2 rounded group cursor-pointer ${ task.completed ? 'line-through text-green-600' : 'text-white' } bg-gray-700/15 hover:bg-gray-700/80`}
            onClick={() => handleToggleTodo(task.id)} >
              <div className='flex items-center gap-2'>
                {task.completed ? <FaCheckSquare className='w-6 h-6'/> : <FaSquare className='w-6 h-6 fill-transparent stroke-blue-600 stroke-[20px]'/>}
                <p className='text-lg'>{task.text}</p>
              </div>
              <div>
                {task.date && <span className="text-sm ml-2 text-gray-400 invisible group-hover:visible">({task.date})</span>}
                {task.tags && task.tags.length > 0 && (
                  <span className="text-sm ml-2 text-gray-400">
                    #{task.tags.join(', #')}
                  </span>
                )}
              </div>


          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasklist;