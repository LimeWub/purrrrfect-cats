import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Listing } from './views/listing/Listing'
import { Upload } from './views/upload/Upload'  
import './App.css'
import { Toaster } from 'sonner'
import { TooltipProvider } from './components/tooltip'
import { UserProvider, useUser } from './context/UserContext'
import { Button } from './components/button'

function UserInput() {
  const { userName, setUserName } = useUser()

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const userId = formData.get('user-id')?.toString() ?? ''
    setUserName(userId)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-end gap-2 p-4">
      <label htmlFor="user-id" className="font-medium text-sm">User ID:</label>
      <input
        id="user-id"
        name="user-id"
        type="text"
        className="flex-1 max-w-2xs px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
      />
      <Button type="submit" size="sm">Set User</Button>
      <span className="text-sm text-muted-foreground">
        Current: {userName || 'logged out'}
      </span>
    </form>
  )
}

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <TooltipProvider>
      <Toaster richColors position="top-right" />
          <UserInput />
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
    </UserProvider>
  )
}

export default App
