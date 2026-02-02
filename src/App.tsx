import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Listing } from './views/listing/Listing'
import { Upload } from './views/upload/Upload'  
import { NotFound } from './views/not-found/NotFound'
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
          <main className="flex-grow flex flex-col">
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<NotFound />} />
      </Routes>
          </main>
          <footer className="container mx-auto flex items-center justify-between gap-2 p-4 text-muted-foreground text-sm">
            <p>
              <svg aria-label="Waracle" className="inline-block size-5 fill-current" xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 40 25" fill="none">
                <path d="M21.9652 0.823142C20.2544 -0.440765 17.8415 -0.096063 16.5457 1.57L16.4819 1.65298L4.0726 18.4859L4.01515 18.5689C2.80231 20.2988 3.1917 22.7117 4.90244 23.9692C6.63872 25.2523 9.1027 24.8757 10.3858 23.1394L22.795 6.30646C24.0781 4.57018 23.7015 2.1062 21.9652 0.823142Z" />
                <path d="M35.204 0.816678L35.121 0.759228C33.4167 -0.428079 31.0548 -0.0706103 29.7781 1.56353L29.7143 1.64652L17.305 18.4795L17.2476 18.5624C16.0347 20.2923 16.4241 22.7053 18.1349 23.9628C19.8711 25.2458 22.3351 24.8692 23.6182 23.1329L36.0274 6.29999C37.3105 4.56372 36.9339 2.09974 35.1976 0.816678H35.204Z" />
                <path d="M9.37079 4.68564C9.37079 2.10676 7.26427 0.000244141 4.68539 0.000244141C2.10651 0.000244141 0 2.10676 0 4.68564C0 5.66229 0.306402 6.57512 0.823455 7.32835L4.29601 12.0776C4.41091 12.2244 4.74284 12.5436 5.13223 12.0074L8.55371 7.32835C9.07077 6.57512 9.37717 5.66229 9.37717 4.68564H9.37079Z" />
              </svg> 
              Technical Test
            </p>
            <p>&copy; {new Date().getFullYear()} Myrto Kontouli</p>
          </footer>
      </TooltipProvider>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
