import React, { useState, useEffect } from 'react';
import { FaCheckSquare, FaMinus, FaPlus, FaSquare, FaEdit, FaTrash } from 'react-icons/fa'; // Import the plus icon
import { tabs } from "./sidebar"

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date?: string; // Add date property
  tags?: string[]; // Add tags property
  urgency: string,
  importance: string,
  isEditing?: boolean; // Add isEditing property
}

interface TasklistProps {
  activeTab: string; // Add activeTab prop
  setTabCounts: any;
}

const Tasklist: React.FC<TasklistProps> = ({ activeTab, setTabCounts }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [isAddingTask, setIsAddingTask] = useState(false); // State to toggle input visibility
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskTags, setNewTaskTags] = useState<string[]>([]);
  const [newUrgency, setNewUrgency] = useState('');
  const [newImportance, setNewImportance] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])


  useEffect(() => {
    const newCounts = { Inbox: 0, Today: 0, Completed: 0, Missed: 0 };

    tasks.forEach((task) => {
      if (!task.completed) {
        newCounts.Inbox++;
        if (task.date === currentDate) {
          newCounts.Today++;
        } else if (task.date < currentDate) {
          newCounts.Missed++;
        }
      } else {
        newCounts.Completed++;
      }
    });

    setTabCounts(newCounts);
  }, [tasks, currentDate, setTabCounts]); 

  useEffect(() => {
    setCurrentDate(new Date().toISOString().slice(0, 10)); // Set current date on mount
  }, []);
  const today = new Date(currentDate);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDate(event.target.value);
  };

  const handleUrgencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUrgency(event.target.value);
  }

  const handleImportanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewImportance(event.target.value);
  }
  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value.split(',').map(tag => tag.trim());
    setNewTaskTags(tags);
  };

  //* Adding Task logic
  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      setTasks(prevTasks => [
        ...prevTasks,
        {
          id: Date.now(),
          text: newTaskText,
          completed: false,
          date: newTaskDate || currentDate,
          urgency: newUrgency,
          importance: newImportance,
          tags: newTaskTags,
        },
      ]);
      setNewTaskText('');
      setNewTaskDate('');
      setNewTaskTags([]);
      setNewUrgency('');
      setNewImportance('');
      setIsAddingTask(false); // Hide the input form after adding
    }
  };

  // 1. Create a toggle function for adding tasks
  const handleToggleAddTask = () => {
    // Cancel any editing mode for all tasks
    setTasks(prevTasks =>
      prevTasks.map(task => ({ ...task, isEditing: false }))
    );
    // Toggle the adding task mode
    setIsAddingTask(prev => !prev);
  };

  // 2. Modify the edit handler to cancel adding mode if active
  const handleEditTask = (id: number) => {
    // Cancel adding task mode if it was active
    setIsAddingTask(false);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  const handleUpdateTask = (id: number) => {
    if (newTaskText.trim() !== '') {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? {
                ...task,
                text: newTaskText,
                date: newTaskDate || currentDate, // Use current date if not specified
                tags: newTaskTags,
                urgency: newUrgency,
                importance: newImportance,
                isEditing: false, // Remove editing flag
              }
            : task
        )
      );
      setNewTaskText('');
      setNewTaskDate('');
      setNewUrgency('');
      setNewImportance('');
      setNewTaskTags([]);      
    }

  };

  const handleCancelEdit = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, isEditing: false } : task))
    );
    setNewTaskText('');
    setNewTaskDate('');
    setNewUrgency('');
    setNewImportance('');
    setNewTaskTags([]);
  };


  const handleDeleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  //* Toggle Completed/Uncomplete Task
  const handleToggleTodo = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "Inbox") {
      return!task.completed; // Inbox: All uncompleted tasks
    } 
    else if (activeTab === "Today") {
      return (
      !task.completed && task.date === currentDate
      ); // Today: Uncompleted tasks with today's date
    } 
    else if (activeTab === "Completed") {
      return task.completed; // Completed: All completed tasks
    } 
    else if (activeTab === "Missed") {
      return (
      !task.completed &&
        task.date &&
        new Date(task.date) < new Date(currentDate)
      ); // Missed: Uncompleted tasks with a date before today
    }
    return true; // Default: show all tasks
  });

  const activeTabDescription = tabs.find(tab => tab.name === activeTab)?.desc || ""; // Provide a default if not found


  return (
    <div className=""> {/* Main container with dark background */}
      <div className={`flex items-center justify-between p-4 rounded-lg ${
        activeTab == 'Inbox' ? 'bg-blue-900' 
        : activeTab == 'Missed' ? 'bg-red-900' 
        : activeTab == 'Completed' ? 'bg-green-900' 
        : activeTab == 'Today' ? 'bg-green-700' 
        : ''
      }`}>
        <div className='inline-flex items-center gap-4'>
          <h2 className="text-lg font-semibold text-white">{activeTab}</h2>
          <p>{activeTabDescription}</p>          
        </div>

        <div className='inline-flex '>
          {isAddingTask && ( // Conditionally render the input form
            <div className="flex justify-end items-center mx-4">
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
              <select 
                name="urgency" 
                id="urgency"
                className='p-2 mr-2 bg-gray-700 text-white rounded'
                value={newUrgency}
                onChange={handleUrgencyChange}
              >
                <option value="">--urgency ?--</option>
                <option value="urgent">urgent</option>
                <option value="not-urgent">not urgent</option>
              </select>
              <select 
                name="importance" 
                id="importance"
                className='p-2 mr-2 bg-gray-700 text-white rounded'
                value={newImportance}
                onChange={handleImportanceChange}
              >
                <option value="">--importance ?--</option>
                <option value="important">important</option>
                <option value="not-important">not important</option>
              </select>
              <button
                className="bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-4"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          )}        
          <button onClick={handleToggleAddTask} className="text-gray-400 border-[1px] border-blue-400/0 hover:border-blue-400/50 active:bg-blue-600 hover:text-gray-200 py-4"> {/* Plus button */}
            {isAddingTask ? <FaMinus /> : <FaPlus /> }
          </button>          
        </div>

      </div>

      <div className={`min-h-[48rem] mt-4 rounded-md ${
        activeTab == 'Inbox' ? 'bg-blue-900/20' 
        : activeTab == 'Missed' ? 'bg-red-900/20' 
        : activeTab == 'Completed' ? 'bg-green-900/20' 
        : activeTab == 'Today' ? 'bg-green-700/20' 
        : ''
      }`}>
        <ul className='mt-4'>
          {filteredTasks.map((task) => (
            <li key={task.id} 
              className={`flex items-center justify-between px-2 py-4 my-2 rounded group cursor-pointer 
              ${
                activeTab == 'Inbox' ? 'bg-blue-900/20 hover:bg-blue-600/20' 
              : activeTab == 'Missed' ? 'bg-red-900/40 hover:bg-red-600/40' 
              : activeTab == 'Completed' ? 'bg-green-900/20 hover:bg-green-600/20' 
              : activeTab == 'Today' ? 'bg-green-700/20 hover:bg-green-600/40' 
              : ''
              }`}>
                { task.isEditing ? (
                  <div className="flex-grow flex items-center gap-2">
                    <input
                      type="text"
                      className="p-2 mr-2 bg-gray-700 text-white rounded w-full" // Added w-full
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
                    <select 
                      name="urgency" 
                      id="urgency"
                      className='p-2 mr-2 bg-gray-700 text-white rounded'
                        value={newUrgency}
                        onChange={handleUrgencyChange}
                      >
                        <option value="">--urgency ?--</option>
                        <option value="urgent">urgent</option>
                        <option value="not-urgent">not urgent</option>
                      </select>
                      <select 
                        name="importance" 
                        id="importance"
                        className='p-2 mr-2 bg-gray-700 text-white rounded'
                        value={newImportance}
                        onChange={handleImportanceChange}
                      >
                      <option value="">--importance ?--</option>
                      <option value="important">important</option>
                      <option value="not-important">not important</option>
                    </select>
                    <button
                      className="bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                      onClick={() => handleUpdateTask(task.id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      onClick={() => handleCancelEdit(task.id)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className='flex items-center gap-2' onClick={() => handleToggleTodo(task.id)} >
                    {task.completed ? <FaCheckSquare className='w-6 h-6 text-green-600'/> : <FaSquare className='w-6 h-6 fill-blue-600/20 stroke-blue-600 stroke-[20px]'/>}
                    <p className={`text-lg ${ task.completed ? 'text-green-600' : 'text-white' }`}>{task.text}</p>
                      {task.date && 
                      <span className={`text-sm ml-2 group-hover:block 
                      ${task.date == currentDate ? 'text-green-500' 
                        : task.date == tomorrow.toISOString().slice(0, 10) ? 'text-orange-400 hidden' 
                        : task.date < currentDate ? 'text-red-500 hidden font-semibold' 
                        : 'text-gray-400 hidden' }`}>
                        {task.date == currentDate ? 'Today' : task.date == tomorrow.toISOString().slice(0, 10) ? 'Tomorrow' : task.date < currentDate ? 'Missed - ' + task.date : task.date}
                      </span>}
                      <span className={`text-sm ml-2 group-hover:block ${
                        task.importance == "important" ? 'text-red-500' : 'text-red-200 hidden'
                      }`}>{task.importance}
                      </span>
                      <span className={`text-sm ml-2 group-hover:block ${
                        task.urgency == "urgent" ? 'text-orange-500' : 'text-orange-200 hidden'
                      }`}>{task.urgency}
                      </span>
                      {task.tags && task.tags.length > 0 && (
                        <span className="italic mr-2 text-gray-400 hidden group-hover:visible">
                          #{task.tags.join(', #')}
                        </span>
                      )}                  
                  </div>         
                )}
                {!task.isEditing && (
                  <div>
                    <button onClick={() => handleEditTask(task.id)} className="text-gray-400 hover:text-gray-200 mr-2 justify-self-end"> {/* Edit button */}
                      <FaEdit className='w-6 h-6'/>
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)} className="text-red-200 hover:text-red-500"> {/* Delete button */}
                      <FaTrash className='w-6 h-6'/>
                    </button>                  
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default Tasklist;