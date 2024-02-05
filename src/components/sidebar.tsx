
import React, { useState } from 'react';

interface SidebarProps {
  onToggleTasklist: () => void;
  onToggleNotefield: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleTasklist, onToggleNotefield }) => {


  return(
    <div className="sidebar absolute top-0 bottom-0 sm:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
        
        <div className="p-2.5 my-3 flex items-center text-center ">
          <h1 className="font-bold text-gray-200 text-[20px] ml-3">MS ToDo Replica</h1>
        </div>
        
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      
        <div onClick={onToggleTasklist} className="text-[15px] font-bold p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">Tasks</div>
      
        <div onClick={onToggleNotefield} className="text-[15px] font-bold p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">Notes</div>

      <div className="absolute inset-x-0 bottom-0 ">
        
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        
        <div className="p-4 my-3 flex items-center rounded-md px-4 space-x-2 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <div>
            <img className="rounded-full" src="https://i.ibb.co/L1LQtBm/Ellipse-1.png" alt="avatar" />
          </div>
          
          <div className="flex justify-start flex-col items-start">
            <p className="cursor-pointer text-sm leading-5 text-white">Shin-102</p>
            <p className="cursor-pointer text-xs leading-3 text-gray-300">shin.102@github</p>
          </div>
        </div>  
      </div>
    
    </div>
  )
};

export default Sidebar;