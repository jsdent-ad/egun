export interface FAQ {
  question: string
  answer: string
}

export interface TreatmentContent {
  boardCategory: string
  treatmentType: string
  title: string
  subtitle: string
  description: string
  benefits: string[]
  faq: FAQ[]
  image?: string
}
