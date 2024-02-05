
import React, { useState }  from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Tasklist: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputText, setInputText] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value);
    };

    const handleAddTask = () => {
      if (inputText.trim() !== '') {
        setTasks(prevTasks => [
          ...prevTasks,
          { id: Date.now(), text: inputText, completed: false }
        ]);
        setInputText('');
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
      <div className='w-9/12 bg-blue-200'>
        <h2 className="text-lg font-semibold mb-2">Tasks List</h2>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 mr-2"
            placeholder="Add a new task"
            value={inputText}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
        <ul>
          {tasks.map(task => (
            <li
              key={task.id}
              className={`${
                task.completed ? 'line-through text-green-600' : ''
              } cursor-pointer border-2 border-solid border-red-500`}
              onClick={() => handleToggleTodo(task.id)}
            >
              {task.text}
            </li>
          ))}
        </ul>
      </div>
    );
  };


export default Tasklist;
