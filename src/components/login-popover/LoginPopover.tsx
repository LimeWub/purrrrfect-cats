import * as React from 'react'
import { Button } from '@/components/button'
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from '@/components/popover'
import { useUser } from '@/hooks/useUser'

export const LoginPopover = (props: React.ComponentProps<typeof Popover>) => {
    const { userName, setUserName } = useUser()
    const [open, setOpen] = React.useState(false)

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const userId = formData.get('user-id')?.toString() ?? ''
        setUserName(userId)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button size="sm">{userName ? `@${userName}` : 'Login'}</Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
                <PopoverHeader>
                    <PopoverTitle>{userName ? 'Change User' : 'Login'}</PopoverTitle>
                    <PopoverDescription>
                        Emulate a "login" by typing in an ID.<br />
                        Different users have different uploads, votes and favourites.
                    </PopoverDescription>
                </PopoverHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="user-id" className="font-medium text-sm">User ID:</label>
                        <input
                            id="user-id"
                            name="user-id"
                            type="text"
                            className="w-full px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                            placeholder="Enter user ID / Empty to logout"
                            maxLength={5}
                        />
                    </div>
                    <Button type="submit" size="sm" className="w-full">Set User</Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}