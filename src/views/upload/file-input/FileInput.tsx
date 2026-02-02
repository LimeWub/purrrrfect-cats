import { useRef, useState } from 'react'
import { useUploadImage } from '@/hooks/useUploadImage'
import { cn } from '@/utils/cn'
import { Button } from '@/components/button'
import { AlertCircle, X } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/alert'

const ACCEPT_TYPES = 'image/jpeg,image/jpg,image/png,image/gif'

const validateFile = (file: File): string | null => {
  // Validate against the same types as the accept attribute
  // @TODO: Can this not be done more natively?
  const acceptedTypes = ACCEPT_TYPES.split(',').map(t => t.trim().toLowerCase())
  if (!acceptedTypes.includes(file.type.toLowerCase())) {
    const extension = file.name.split('.').pop()?.toUpperCase()
    return `${extension || 'This file type'} is not a valid file type. Supported formats: JPG, PNG, GIF`
  }
  return null
}

interface FileInputProps extends React.ComponentProps<"div"> {
  onSuccess?: () => void
}

export const FileInput = ({ className, onSuccess, ...props }: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const uploadMutation = useUploadImage()
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validateFile(file)
    if (error) {
      setValidationError(error)
      // @TODO: Keep previous file in the input so we don't lose it.
      setSelectedFile(null)
      e.target.value = ''
    } else {
      setValidationError(null)
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    const formData = new FormData()
    // Cat API requires the file to be appended with the key 'file' and the filename
    formData.append('file', selectedFile, selectedFile.name)

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        toast.success('Image uploaded successfully!')
        onSuccess?.()
      },
    })
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && fileInputRef.current) {
      // Sync dropped file to input so onChange fires
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      fileInputRef.current.files = dataTransfer.files
      handleFileChange({ target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>)
    }
    setIsDragOver(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  return (
    <div className="upload flex flex-col gap-2">
      {validationError && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Invalid file type</AlertTitle>
          <AlertDescription>
            {validationError}
          </AlertDescription>
        </Alert>
      )}
      {uploadMutation.isError && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Failed to upload</AlertTitle>
          {uploadMutation.error?.message && (
            <AlertDescription>
              Error: {uploadMutation.error?.message}
            </AlertDescription>
          )}
        </Alert>
      )}
      <div className={cn(
        "bg-tonal-50 rounded-sm aspect-4/1 border border-dashed border-tonal-400 items-center justify-center flex py-6",
        isDragOver && 'border-primary-300 bg-tonal-100',
        className
      )} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave} {...props}>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT_TYPES}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div className="upload-controls flex flex-col items-center gap-2">
          {selectedFile ? (
            <div className="upload-preview-container flex flex-col items-center gap-2 px-4 ">
              <div className="upload-preview w-full object-cover flex gap-2">
                <img className="w-30 h-30 object-cover rounded-xs" src={URL.createObjectURL(selectedFile)} alt="Upload Preview" />
                <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                <Button aria-label="Cancel Upload" onClick={() => {
                  setSelectedFile(null)
                  setValidationError(null)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }} variant="ghost" size="icon-sm">
                  <X />
                </Button>
              </div>

              <Button className="w-full" onClick={handleUpload} disabled={uploadMutation.isPending}>
                {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          ) :
            (
              <>
                <p className="text-md text-tonal-800 font-medium">Drag & Drop image or</p>
                <Button onClick={handleClick}> browse from your device</Button>
                <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG, GIF</p>
              </>
            )}
        </div>
      </div>
    </div>
  )
}
