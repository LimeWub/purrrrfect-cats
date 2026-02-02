import type { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileInput } from './file-input'
import { UploadedListing } from './uploaded-listing/UploadedListing'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/button'
import { Link } from 'react-router-dom'

export const Upload = (props: PropsWithChildren) => {
  const navigate = useNavigate()

  return (
    <div className="upload container mx-auto px-4" {...props}>
      <Button className="-mt-8 -mb-8" variant="link" asChild><Link to="/"><ArrowLeft /> Back</Link></Button>
      <div className="flex flex-col gap-8 py-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-heading-cursive">Upload Image</h2><FileInput onSuccess={() => navigate('/')} />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-heading-cursive">Manage Uploads</h2>
          <UploadedListing />
        </div>
      </div>
    </div>
  )
}
