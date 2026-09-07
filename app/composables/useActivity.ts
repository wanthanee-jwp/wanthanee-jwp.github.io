import { buildActivityGrid, type ActivityGrid } from '~/utils/activity'

interface GithubContributionsResponse {
  readonly total?: Readonly<Record<string, number>>
  readonly contributions?: ReadonlyArray<{
    readonly date: string
    readonly count: number
    readonly level?: number
  }>
}

const GITLAB_USER = 'wanthanee-jwp'
const GITHUB_USER = 'wanthanee-jwp'

const fetchGitlabCounts = async (): Promise<Record<string, number>> => {
  try {
    const raw = await $fetch<Record<string, number>>(
      `https://gitlab.com/users/${GITLAB_USER}/calendar.json`,
      { timeout: 8000 },
    )
    const out: Record<string, number> = {}
    for (const [date, count] of Object.entries(raw ?? {})) {
      if (typeof count === 'number') out[date] = count
    }
    return out
  } catch (error) {
    console.warn('[activity] GitLab fetch failed:', (error as Error).message)
    return {}
  }
}

const fetchGithubCounts = async (): Promise<Record<string, number>> => {
  try {
    const data = await $fetch<GithubContributionsResponse>(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      { timeout: 8000 },
    )
    const out: Record<string, number> = {}
    for (const entry of data.contributions ?? []) {
      out[entry.date] = entry.count
    }
    return out
  } catch (error) {
    console.warn('[activity] GitHub fetch failed:', (error as Error).message)
    return {}
  }
}

export const useActivity = () => useAsyncData<ActivityGrid>(
  'activity',
  async () => {
    const [gitlab, github] = await Promise.all([fetchGitlabCounts(), fetchGithubCounts()])
    const merged: Record<string, number> = { ...gitlab }
    for (const [date, count] of Object.entries(github)) {
      merged[date] = (merged[date] ?? 0) + count
    }
    return buildActivityGrid(merged)
  },
  {
    default: () => buildActivityGrid({}),
  },
)
