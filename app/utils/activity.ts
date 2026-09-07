export type ActivityLevel = 0 | 1 | 2 | 3 | 4

export interface ActivityCell {
  readonly date: string
  readonly count: number
  readonly level: ActivityLevel
}

export interface MonthLabel {
  readonly weekIndex: number
  readonly label: string
}

export interface ActivityGrid {
  readonly weeks: readonly (readonly ActivityCell[])[]
  readonly monthLabels: readonly MonthLabel[]
  readonly totalCount: number
  readonly startDate: string
  readonly endDate: string
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

const WEEK_COUNT = 53

const toLevel = (count: number): ActivityLevel => {
  if (count <= 0) return 0
  if (count === 1) return 1
  if (count <= 4) return 2
  if (count <= 9) return 3
  return 4
}

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const buildActivityGrid = (
  counts: Readonly<Record<string, number>>,
  referenceDate: Date = new Date(),
): ActivityGrid => {
  const end = new Date(referenceDate)
  end.setHours(0, 0, 0, 0)
  const daysFromSaturday = 6 - end.getDay()
  end.setDate(end.getDate() + daysFromSaturday)

  const start = new Date(end)
  start.setDate(end.getDate() - (WEEK_COUNT * 7 - 1))

  const weeks: ActivityCell[][] = []
  const monthLabels: MonthLabel[] = []
  let currentMonth = -1
  let totalCount = 0
  const cursor = new Date(start)

  for (let w = 0; w < WEEK_COUNT; w++) {
    const week: ActivityCell[] = []
    for (let d = 0; d < 7; d++) {
      const date = formatDate(cursor)
      const count = counts[date] ?? 0
      totalCount += count
      week.push({ date, count, level: toLevel(count) })
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(week)

    const firstDayOfWeek = week[0]!.date
    const [year, month] = firstDayOfWeek.split('-').map(Number) as [number, number]
    const dayOfMonth = Number(firstDayOfWeek.split('-')[2])
    const monthIndex = month - 1
    if (monthIndex !== currentMonth && dayOfMonth <= 7) {
      monthLabels.push({ weekIndex: w, label: MONTHS[monthIndex]! })
      currentMonth = monthIndex
    }
    void year
  }

  return {
    weeks,
    monthLabels,
    totalCount,
    startDate: formatDate(start),
    endDate: formatDate(end),
  }
}
