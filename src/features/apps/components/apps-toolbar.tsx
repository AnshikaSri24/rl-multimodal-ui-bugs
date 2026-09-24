import { type ChangeEvent } from 'react'
import { SlidersHorizontal, ArrowUpAZ, ArrowDownAZ } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type AppSort, type AppType } from '../lib/filter-apps'

const appText = new Map<AppType, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
])

type AppsToolbarProps = {
  searchTerm: string
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  appType: AppType
  onTypeChange: (value: AppType) => void
  sort: AppSort
  onSortChange: (value: AppSort) => void
}

export function AppsToolbar({
  searchTerm,
  onSearchChange,
  appType,
  onTypeChange,
  sort,
  onSortChange,
}: AppsToolbarProps) {
  return (
    <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
      <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
        <Input
          placeholder='Filter apps...'
          className='h-9 w-40 lg:w-62.5'
          value={searchTerm}
          onChange={onSearchChange}
        />
        <Select value={appType} onValueChange={onTypeChange}>
          <SelectTrigger className='w-36'>
            <SelectValue>{appText.get(appType)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Apps</SelectItem>
            <SelectItem value='connected'>Connected</SelectItem>
            <SelectItem value='notConnected'>Not Connected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className='w-16'>
          <SelectValue>
            <SlidersHorizontal size={18} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent align='end'>
          <SelectItem value='asc'>
            <div className='flex items-center gap-4'>
              <ArrowUpAZ size={16} />
              <span>Ascending</span>
            </div>
          </SelectItem>
          <SelectItem value='desc'>
            <div className='flex items-center gap-4'>
              <ArrowDownAZ size={16} />
              <span>Descending</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
