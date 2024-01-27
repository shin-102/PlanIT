import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Sidebar} from './components/sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section>
      <Sidebar />
      <h1 className="text-3xl font-bold underline">
      Hello world!
      </h1>
    </section>
  )
}

export default App
