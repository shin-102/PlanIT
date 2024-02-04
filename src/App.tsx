import React from 'react';
import './App.css'

import Sidebar from './components/sidebar'
import Tasklist from './components/Tasklist';
import Notefield from './components/notefield';

const App: React.FC = () => {

  return (
    <section>
      <Sidebar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <Tasklist />
          <Notefield />
        </div>
      </div>
    </section>
  )
}

export default App;
