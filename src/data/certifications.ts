export interface Certification {
  id: string
  title: string
  issuer: string
  hours: number
  issuedOn: string
  credentialUrl: string
}

// AWS Academy Graduate training badges — titles, hours and dates as printed on the certificates.
export const certifications: Certification[] = [
  {
    id: 'aws-cloud-foundations',
    title: 'Cloud Foundations',
    issuer: 'AWS Academy',
    hours: 20,
    issuedOn: '2026-01-27',
    credentialUrl: 'https://www.credly.com/go/IQPAEWzp',
  },
  {
    id: 'aws-generative-ai-foundations',
    title: 'Generative AI Foundations',
    issuer: 'AWS Academy',
    hours: 12,
    issuedOn: '2026-01-28',
    credentialUrl: 'https://www.credly.com/badges/fe13657d-a862-44b9-aa03-09d96bc8559c',
  },
  {
    id: 'aws-machine-learning-foundations',
    title: 'Machine Learning Foundations',
    issuer: 'AWS Academy',
    hours: 20,
    issuedOn: '2026-01-29',
    credentialUrl: 'https://www.credly.com/go/5zGLku4O',
  },
  {
    id: 'aws-ml-for-nlp',
    title: 'Machine Learning for Natural Language Processing',
    issuer: 'AWS Academy',
    hours: 20,
    issuedOn: '2026-01-28',
    credentialUrl: 'https://www.credly.com/go/19xcc2lW',
  },
]
