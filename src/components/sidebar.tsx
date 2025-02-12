import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import myAvatar from '../assets/MyAvatar Notion.png'; // Import directly

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {  // Correct prop destructuring
  const userData = {
    name: "Shin-102",
    email: "shin.102@github",
  };

  const tabs = [
    { name: "Inbox", icon: "inbox" },
    { name: "Today", icon: "calendar-day" },
    { name: "Completed", icon: "check-circle" },
    { name: "Missed", icon: "exclamation-triangle" },
  ];

  return (
    <nav className={`sidebar fixed top-0 left-0 bottom-0 py-2 overflow-y-auto text-left bg-gray-900 transition-all duration-300`}>

      <div className="flex justify-between items-center py-4 gap-4">
        <h1 className={`font-bold text-gray-200 text-[20px] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 ml-4' : 'opacity-0 hidden'}`}> {/* Conditional opacity for title */}
          Planify replica
        </h1>
        <button onClick={toggleSidebar} className={`text-gray-400 border-[1px] border-blue-400/0 hover:border-blue-400/50 active:bg-blue-600 hover:text-gray-200 ${isSidebarOpen ? 'mr-4' : 'mx-4'}`}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="my-2 bg-gray-600 h-[1px]"></div>

      <div className={`grid grid-cols-2 gap-2 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 mx-4' : 'opacity-0 hidden'}`}> {/* Conditional opacity for tabs */}
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer border-[1px] border-blue-400/0 hover:border-blue-400/50 active:bg-blue-600 text-white"
          >
            <span>{tab.name}</span>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div className={`p-4 my-3 flex items-center rounded-md px-4 space-x-2 duration-300 cursor-pointer hover:bg-blue-600 text-white ${isSidebarOpen ? '' : 'justify-center' }`}>
          <div>
            <img className="rounded-full w-10 h-10" src={myAvatar} alt="avatar" />
          </div>
          <div className={`flex justify-start flex-col items-start transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}> {/* Conditional opacity for user info */}
            <p className="cursor-pointer text-sm leading-5 text-white">{userData.name}</p>
            <p className="cursor-pointer text-xs leading-3 text-gray-300">{userData.email}</p>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Sidebar;