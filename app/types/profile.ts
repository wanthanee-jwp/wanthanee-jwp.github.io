export interface Profile {
  readonly name: string
  readonly position: string
  readonly experienceYears: number
  readonly company: string
  readonly location: string
  readonly specialization: readonly string[]
}

export interface SkillCategory {
  readonly category: string
  readonly items: readonly string[]
}

export interface Experience {
  readonly company: string
  readonly position: string
  readonly startDate: string
  readonly endDate: string
  readonly responsibilities: readonly string[]
}

export interface Project {
  readonly name: string
  readonly description: string
  readonly role: string
  readonly highlights: readonly string[]
  readonly technologies: readonly string[]
  readonly github: string
  readonly demo: string
}

export interface Contact {
  readonly email: string
  readonly github: string
  readonly gitlab: string
}

export interface PortfolioData {
  readonly profile: Profile
  readonly summary: string
  readonly skills: readonly SkillCategory[]
  readonly experience: readonly Experience[]
  readonly projects: readonly Project[]
  readonly contact: Contact
}

export type ContactLinkKind = 'email' | 'github' | 'gitlab'

export interface ContactLink {
  readonly kind: ContactLinkKind
  readonly label: string
  readonly displayValue: string
  readonly href: string
  readonly external: boolean
}
