import { Fragment } from 'react'
import { cn, getDisplayNameInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { type ChatUser } from '../data/chat-types'

type ChatListProps = {
  conversations: ChatUser[]
  selectedId?: string
  onSelect: (conversation: ChatUser) => void
}

export function ChatList({
  conversations,
  selectedId,
  onSelect,
}: ChatListProps) {
  return (
    <ScrollArea className='-mx-3 h-full overflow-scroll p-3'>
      {conversations.map((conversation) => {
        const { id, profile, username, messages, fullName } = conversation
        const lastConvo = messages[0]
        const lastMsg =
          lastConvo.sender === 'You'
            ? `You: ${lastConvo.message}`
            : lastConvo.message
        return (
          <Fragment key={id}>
            <button
              type='button'
              className={cn(
                'group hover:bg-accent hover:text-accent-foreground',
                `flex w-full rounded-md px-2 py-2 text-start text-sm`,
                selectedId === id && 'sm:bg-muted'
              )}
              onClick={() => onSelect(conversation)}
            >
              <div className='flex gap-2'>
                <Avatar>
                  <AvatarImage src={profile} alt={username} />
                  <AvatarFallback>
                    {getDisplayNameInitials(fullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className='col-start-2 row-span-2 font-medium'>
                    {fullName}
                  </span>
                  <span className='col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis text-muted-foreground group-hover:text-accent-foreground/90'>
                    {lastMsg}
                  </span>
                </div>
              </div>
            </button>
            <Separator className='my-1' />
          </Fragment>
        )
      })}
    </ScrollArea>
  )
}
