export type Content = {
  page: number
  content: string
}

export type Chapter = {
  chapter: number
  publishDate: string
  contents: Content[]
}
