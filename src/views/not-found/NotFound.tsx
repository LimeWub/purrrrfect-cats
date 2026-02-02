import { Link } from 'react-router-dom'
import { Button } from '@/components/button'
import { ErrorState, ErrorStateTitle, ErrorStateDescription } from '@/components/error-state'
import { PawPrint, ArrowLeft } from 'lucide-react'

export const NotFound = () => {
  return (
    <ErrorState className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center text-center relative">
      <ErrorStateTitle className="text-6xl font-heading-cursive">404</ErrorStateTitle>
      <ErrorStateDescription>
        Oops! There may have been something here, but it's gone now.
      </ErrorStateDescription>
      <Button asChild>
        <Link to="/"><ArrowLeft /> Back to Home</Link>
      </Button>
      <PawPrint className="size-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-primary-300 -z-1 ml-30 -mt-15" />
    </ErrorState>
  )
}
