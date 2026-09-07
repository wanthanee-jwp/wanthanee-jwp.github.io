import type { Contact, ContactLink } from '~/types/profile'

const normalizeHandle = (handle: string) => handle.trim().replace(/^@/, '')

export const createContactLinks = (contact: Contact): ContactLink[] => {
  const links: ContactLink[] = []
  const email = contact.email.trim()
  const github = normalizeHandle(contact.github)
  const gitlab = normalizeHandle(contact.gitlab)

  if (email) {
    links.push({
      kind: 'email',
      label: 'Email',
      displayValue: email,
      href: `mailto:${email}`,
      external: false,
    })
  }

  if (github) {
    links.push({
      kind: 'github',
      label: 'GitHub',
      displayValue: `github.com/${github}`,
      href: `https://github.com/${github}`,
      external: true,
    })
  }

  if (gitlab) {
    links.push({
      kind: 'gitlab',
      label: 'GitLab',
      displayValue: `gitlab.com/${gitlab}`,
      href: `https://gitlab.com/${gitlab}`,
      external: true,
    })
  }

  return links
}
