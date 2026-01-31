import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

const isBrowser = typeof window !== 'undefined'

const storagePersister = isBrowser
  ? createAsyncStoragePersister({
      storage: window.localStorage,
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    })
  : undefined

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
    },
  },
})

if (isBrowser && storagePersister) {
  persistQueryClient({
    queryClient,
    persister: storagePersister,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    hydrateOptions: {
      defaultOptions: {
        queries: {
          gcTime: 1000 * 60 * 2,
        },
      },
    },
  })
}

export type { QueryClient } from '@tanstack/react-query'
