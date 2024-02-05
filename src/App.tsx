import React, { useState } from 'react';
import './App.css'

import Sidebar from './components/sidebar'
import Tasklist from './components/tasklist';
import Notefield from './components/notefield';

const App: React.FC = () => {
  const [showTasklist, setShowTasklist] = useState<boolean>(true);
  const [showNotefield, setShowNotefield] = useState<boolean>(false);

  const handleToggleTasklist = () => {
    setShowTasklist(true);
    setShowNotefield(false);
  };

  const handleToggleNotefield = () => {
    setShowTasklist(false);
    setShowNotefield(true);
  };

  return (
    <section>
      <Sidebar 
        onToggleTasklist={handleToggleTasklist}
        onToggleNotefield={handleToggleNotefield}
      />
      <div className="container mx-auto flex justify-center items-center w-screen h-[750px] bg-slate-400 rounded-md ">
          {showTasklist && <Tasklist />}
          {showNotefield && <Notefield />}
      </div>
    </section>
  )
}

export default App;
