import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Listing } from './views/listing/Listing'
import { Upload } from './views/upload/Upload'  
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <nav className="app-nav">
        <Link to="/">Gallery</Link>
        <Link to="/upload">Upload</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
