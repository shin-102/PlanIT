import React, { useState } from 'react';
import './App.css'

import Sidebar from './components/sidebar'
import Tasklist from './components/Tasklist';
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
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {showTasklist && <Tasklist />}
          {showNotefield && <Notefield />}
        </div>
      </div>
    </section>
  )
}

export default App;
