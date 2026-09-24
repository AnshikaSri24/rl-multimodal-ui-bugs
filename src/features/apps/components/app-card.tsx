import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { type App } from '../data/apps'

const connectedButtonClass =
  'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900'

type AppCardProps = {
  app: App
}

export function AppCard({ app }: AppCardProps) {
  const isConnected = app.connected

  return (
    <li className='rounded-lg border p-4 hover:shadow-md'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex h-10 w-14 items-center justify-center rounded-lg bg-muted p-2'>
          {app.logo}
        </div>
        <Button
          variant='outline'
          size='sm'
          className={cn(!isConnected && connectedButtonClass)}
        >
          {isConnected ? 'Connected' : 'Connect'}
        </Button>
      </div>
      <div>
        <h2 className='mb-1 font-semibold'>{app.name}</h2>
        <p className='line-clamp-2 text-gray-500'>{app.desc}</p>
      </div>
    </li>
  )
}
