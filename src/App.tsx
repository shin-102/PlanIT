import React, { useState } from 'react';
import './App.css'; // If you're using a separate CSS file

import Sidebar from './components/sidebar';
import Tasklist from './components/tasklist';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Inbox"); // State to track the active tab
  
  const [tabCounts, setTabCounts] = useState({
    Inbox: 0,
    Today: 0,
    Completed: 0,
    Missed: 0,
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onTabClick={handleTabClick} 
        tabCounts={tabCounts}/>
      <main className={`container mx-auto p-4 my-4 w-full min-h-[900px] bg-gray-900 rounded-lg transition-all duration-300 ${isSidebarOpen ? 'ml-[350px]' : 'ml-[150px]'}`}> {/* Conditional margin */}
        <Tasklist activeTab={activeTab} setTabCounts={setTabCounts}/>
      </main>
    </>
  );
};

export default App;