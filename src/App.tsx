import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Listing } from './views/listing/Listing'
import { Upload } from './views/upload/Upload'  
import './App.css'
import { Toaster } from 'sonner'
import { TooltipProvider } from './components/tooltip'
import { UserProvider } from './context/UserContext'
import { Logo } from './components/logo'
import { LoginPopover } from './components/login-popover'

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <TooltipProvider>
      <Toaster richColors position="top-right" />
          {/* <nav className="app-nav">
        <Link to="/">Gallery</Link>
        <Link to="/upload">Upload</Link>
            </nav> */}
          
          <header className="container mx-auto flex items-center justify-between gap-2 p-4">
            <Link to="/"><Logo className="w-40" /></Link>
            <LoginPopover />
          </header>
          <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
          </main>
      </TooltipProvider>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
