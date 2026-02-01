import type { PropsWithChildren } from 'react'
// import { FileInput } from './file-input/FileInput'

export const Upload = (props: PropsWithChildren) => {
  return (
    <div className="upload" {...props}>
      <h1>Upload Cat Picture</h1>
      {/* <FileInput /> */}
    </div>
  )
}
