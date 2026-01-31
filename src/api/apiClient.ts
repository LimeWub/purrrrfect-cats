export const CAT_API_BASE = 'https://api.thecatapi.com/v1'
const API_KEY = import.meta.env.VITE_CAT_API_KEY ?? ''

export async function fetchCatApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData
  const isDelete = options.method === 'DELETE'
  
  // Only set Content-Type for POST/PUT with JSON body
  // @TODO: Is there no better way to distinguish JSON body?
  const headers: HeadersInit = isFormData || isDelete
    ? { 'x-api-key': API_KEY }
    : { 'x-api-key': API_KEY, 'Content-Type': 'application/json' }
  
  const response = await fetch(`${CAT_API_BASE}${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Cat API error ${response.status}: ${errorText}`)
  }

  // Handle 204 No Content
  if (response.status === 204) return undefined as T // @TODO: Not loving this.

  const text = await response.text()
  if (!text.trim()) return undefined as T // @TODO: Not loving this.

  return JSON.parse(text)
}
