import profileData from '~~/data/profile.json'
import type { PortfolioData } from '~/types/profile'

export const useProfile = () => {
  const profile = profileData as PortfolioData

  return {
    profile: readonly(profile),
  }
}
