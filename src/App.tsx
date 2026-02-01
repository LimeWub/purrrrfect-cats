import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Listing } from './views/listing/Listing'
import { Upload } from './views/upload/Upload'  
import './App.css'
import { TooltipProvider } from './components'

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
      <Toaster richColors position="top-right" />
      {/* <button onClick={() => toast.error('My first toast', { action: {
        label: 'Undo',
        onClick: () => toast.dismiss()
      }})}>
        Give me a toast
      </button> */}
      <nav className="app-nav">
        <Link to="/">Gallery</Link>
        <Link to="/upload">Upload</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
