export interface ContactPerson {
  name: string
  email: string
  phone: string
}

export interface ContactConfiguration {
  people: ContactPerson[]
  instagram: string
  facebook: string
  brandEmail: string
  brandPhone: string
  whatsappPhone: string
}

export const contactConfig: ContactConfiguration = {
  people: [
    { name: 'Lucija Matić', email: '', phone: '+385958217817' },
    { name: 'Ivana Lulić', email: '', phone: '+385955359696' },
  ] satisfies ContactPerson[],
  instagram: 'https://www.instagram.com/noecandles_/',
  facebook: '',
  brandEmail: '',
  brandPhone: '+385955359696',
  whatsappPhone: '+385958217817',
}