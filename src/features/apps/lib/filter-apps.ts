import { type App } from '../data/apps'

export type AppType = 'all' | 'connected' | 'notConnected'
export type AppSort = 'asc' | 'desc'

type FilterAppsOptions = {
  type: AppType
  search: string
  sort: AppSort
}

/**
 * Returns a new, sorted and filtered list of apps.
 * The source list is never mutated.
 */
export function filterApps(
  list: App[],
  { type, search, sort }: FilterAppsOptions
) {
  const direction = sort === 'asc' ? -1 : 1
  const query = search.toLowerCase()

  return [...list]
    .sort((a, b) => direction * a.name.localeCompare(b.name))
    .filter((app) =>
      type === 'connected'
        ? app.connected
        : type === 'notConnected'
          ? !app.connected
          : true
    )
    .filter((app) => app.name.toLowerCase().includes(query))
}
