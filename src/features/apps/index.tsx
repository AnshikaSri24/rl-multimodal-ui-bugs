import { type ChangeEvent, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AppCard } from './components/app-card'
import { AppsToolbar } from './components/apps-toolbar'
import { apps } from './data/apps'
import { type AppSort, type AppType, filterApps } from './lib/filter-apps'

const route = getRouteApi('/_authenticated/apps/')

export function Apps() {
  const {
    filter = '',
    type = 'all',
    sort: initSort = 'asc',
  } = route.useSearch()
  const navigate = route.useNavigate()

  const [sort, setSort] = useState<AppSort>(initSort)
  const [appType, setAppType] = useState<AppType>(type)
  const [searchTerm, setSearchTerm] = useState(filter)

  const filteredApps = filterApps(apps, {
    type: appType,
    search: searchTerm,
    sort,
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    navigate({
      search: (prev) => ({
        ...prev,
        filter: e.target.value || undefined,
      }),
    })
  }

  const handleTypeChange = (value: AppType) => {
    setAppType(value)
    navigate({
      search: (prev) => ({
        ...prev,
        type: value === 'all' ? undefined : value,
      }),
    })
  }

  const handleSortChange = (sort: AppSort) => {
    setSort(sort)
    navigate({ search: (prev) => ({ ...prev, sort }) })
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      {/* ===== Content ===== */}
      <Main fixed>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            App Integrations
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your apps for the integration!
          </p>
        </div>
        <AppsToolbar
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          appType={appType}
          onTypeChange={handleTypeChange}
          sort={sort}
          onSortChange={handleSortChange}
        />
        <Separator className='shadow-sm' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
          {filteredApps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </ul>
      </Main>
    </>
  )
}
