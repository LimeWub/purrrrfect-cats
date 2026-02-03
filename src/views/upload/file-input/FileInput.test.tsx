import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FileInput } from './FileInput'
import { UserProvider } from '@/context/UserContext'
import * as useUploadImageHook from '@/hooks/useUploadImage'

vi.mock('@/hooks/useUploadImage')

type MockUploadResult = ReturnType<typeof useUploadImageHook.useUploadImage>

const createMockFile = (name: string, type: string) => new File(['content'], name, { type })
const getFileInput = () => document.querySelector('input[type="file"]') as HTMLInputElement

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })}>
        <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
)

describe('FileInput', () => {
    const mockMutate = vi.fn()
    const mockUseUploadImage = vi.mocked(useUploadImageHook.useUploadImage)

    beforeEach(() => {
        vi.clearAllMocks()
        mockUseUploadImage.mockReturnValue({ mutate: mockMutate, isPending: false, isError: false, error: null } as unknown as MockUploadResult)
    })

    it('renders', () => {
        const { container } = render(<FileInput />, { wrapper: TestWrapper })
        expect(container).toMatchSnapshot()
    })

    it('opens file picker when browse button is clicked', async () => {
        const user = userEvent.setup()
        render(<FileInput />, { wrapper: TestWrapper })
        const clickSpy = vi.spyOn(getFileInput(), 'click')
        await user.click(screen.getByText(/browse from your device/i))
        expect(clickSpy).toHaveBeenCalled()
    })

    it.each([['image/jpeg', 'test.jpg'], ['image/png', 'test.png'], ['image/gif', 'test.gif']])(
        'accepts valid %s file',
        async (type, name) => {
            const user = userEvent.setup()
            render(<FileInput />, { wrapper: TestWrapper })
            await user.upload(getFileInput(), createMockFile(name, type))
            await waitFor(
                () => {
                    expect(screen.getByText(name)).toBeInTheDocument()
                    expect(screen.getByText('Upload')).toBeInTheDocument()
                }
            )
        }
    )

    it.each([['image/pdf', 'application.pdf']])(
        'does not accept invalid %s file',
        async (type, name) => {
            const user = userEvent.setup()
            render(<FileInput />, { wrapper: TestWrapper })
            await user.upload(getFileInput(), createMockFile(name, type))
            await waitFor(() => expect(screen.queryByText(name)).not.toBeInTheDocument())
        }
    )

    it('rejects invalid file type', async () => {
        render(<FileInput />, { wrapper: TestWrapper })
        const fileInput = getFileInput()
        const file = createMockFile('test.pdf', 'application/pdf')
        const fileList = Object.create(FileList.prototype)
        Object.defineProperty(fileList, '0', { get: () => file })
        Object.defineProperty(fileList, 'length', { get: () => 1 })
        Object.defineProperty(fileList, 'item', { value: (i: number) => (i === 0 ? file : null) })
        Object.defineProperty(fileInput, 'files', { value: fileList, configurable: true })
        fileInput.dispatchEvent(new Event('change', { bubbles: true }))
        await waitFor(() => expect(screen.getByText('Invalid file type')).toBeInTheDocument())
    })

    it('clears file when cancel is clicked', async () => {
        const user = userEvent.setup()
        render(<FileInput />, { wrapper: TestWrapper })
        await user.upload(getFileInput(), createMockFile('cat.jpg', 'image/jpeg'))
        await waitFor(() => expect(screen.getByText('cat.jpg')).toBeInTheDocument())
        await user.click(screen.getByLabelText('Cancel Upload'))
        await waitFor(() => expect(screen.queryByText('cat.jpg')).not.toBeInTheDocument())
    })

    it('calls upload mutation when upload is clicked', async () => {
        const user = userEvent.setup()
        const onSuccess = vi.fn()
        const mockMutate = vi.fn((_, opts) => opts?.onSuccess?.()) // I 100% understand why I need to do this.
        mockUseUploadImage.mockReturnValue({ mutate: mockMutate, isPending: false, isError: false, error: null } as unknown as MockUploadResult)
        render(<FileInput onSuccess={onSuccess} />, { wrapper: TestWrapper })
        const file = createMockFile('cat.jpg', 'image/jpeg')
        await user.upload(getFileInput(), file)
        await waitFor(() => expect(screen.getByText('Upload')).toBeInTheDocument())
        await user.click(screen.getByText('Upload'))
        await waitFor(() => {
            expect((mockMutate.mock.calls[0][0] as FormData).get('file')).toBeInstanceOf(File)
            expect(onSuccess).toHaveBeenCalled()
        })
    })

    it('shows loading state', async () => {
        const user = userEvent.setup()
        mockUseUploadImage.mockReturnValue({ mutate: mockMutate, isPending: true, isError: false, error: null } as unknown as MockUploadResult)
        render(<FileInput />, { wrapper: TestWrapper })
        await user.upload(getFileInput(), createMockFile('cat.jpg', 'image/jpeg'))
        await waitFor(() => expect(screen.getByText('Uploading...')).toBeDisabled())
    })

    it('shows error when upload fails', async () => {
        mockUseUploadImage.mockReturnValue({ mutate: mockMutate, isPending: false, isError: true, error: new Error('Network error') } as unknown as MockUploadResult)
        render(<FileInput />, { wrapper: TestWrapper })
        await waitFor(() => expect(screen.getByText('Failed to upload')).toBeInTheDocument())
    })
})
