import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App