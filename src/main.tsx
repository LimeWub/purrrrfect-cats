import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { /* persistQueryClient, */ PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const storagePersister = createAsyncStoragePersister({
  storage: window.localStorage
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes // @TODO ???
      gcTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
    },
  }, 
})

// @TODO: Do I even need this?
// persistQueryClient({
//   queryClient,
//   persister: storagePersister,
//   maxAge: 1000 * 60 * 60 * 24, // 1 day
//   hydrateOptions: {
//     defaultOptions: {
//       queries: {
//         gcTime: 1000 * 60 * 2, // 2 minutes
//       },
//     },
//   },
// })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: storagePersister }}>
      <App />
      <ReactQueryDevtools />
    </PersistQueryClientProvider >
  </StrictMode>,
)
