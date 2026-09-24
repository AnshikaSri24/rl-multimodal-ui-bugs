import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { type Convo } from '../data/chat-types'

type MessageBubbleProps = {
  message: Convo
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOwnMessage = message.sender === 'You'

  return (
    <div
      className={cn(
        'chat-box max-w-72 px-3 py-2 shadow-lg',
        isOwnMessage
          ? 'self-end rounded-[16px_16px_0_16px] bg-primary/90 text-primary-foreground/75'
          : 'self-start rounded-[16px_16px_16px_0] bg-muted'
      )}
    >
      {message.message}{' '}
      <span
        className={cn(
          'mt-1 block text-xs font-light text-foreground/75 italic',
          isOwnMessage && 'text-end text-primary-foreground/85'
        )}
      >
        {format(message.timestamp, 'h:mm a')}
      </span>
    </div>
  )
}
