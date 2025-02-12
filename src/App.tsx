import React, { useState } from 'react';
import './App.css'; // If you're using a separate CSS file

import Sidebar from './components/sidebar';
import Tasklist from './components/tasklist';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State in App.tsx

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="flex"> {/* Make section a flex container */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Pass props */}
      <div className={`container mx-auto p-4 w-screen h-[750px] bg-gray-900 rounded-lg transition-all duration-300 ${isSidebarOpen ? 'ml-[300px]' : ''}`}> {/* Conditional margin */}
        <Tasklist />
      </div>
    </section>
  );
};

export default App;