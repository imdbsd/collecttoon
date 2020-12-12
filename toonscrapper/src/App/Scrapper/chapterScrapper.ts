import axios from 'axios'
import $ from 'cheerio'
import {Chapter, Content} from '../../type'

const CONTENT_SELECTOR = '.reading-content > .page-break > img'
const META_PUBLISH_DATE_SELECTOR = '.yoast-schema-graph'
const META_CURRENT_CHAPTER_SELECTOR = '.chapters_selectbox_holder'

const getChapterContent = (html: string): Content[] => {
  const contents: Content[] = $(CONTENT_SELECTOR, html)
    .map((index, element) => {
      const content = $(element).attr('data-src')?.trim() || ''
      const page = index + 1
      return {
        page,
        content,
      }
    })
    .get()

  if (contents.length > 0) {
    const hasEmptyContent = contents.find((content) => !content.content)
    if (!hasEmptyContent) {
      return contents
    }
  }
  throw new Error('Error parsing content')
}

const getChapterNumber = (html: string): number => {
  const chapterAttribute = $(META_CURRENT_CHAPTER_SELECTOR, html).attr(
    'data-chapter'
  )
  if (chapterAttribute) {
    return parseInt(chapterAttribute?.replace(/[^0-9]/g, ''))
  }
  throw new Error('invalid chapter number')
}

const getPublishDate = (html: string): string => {
  const metaPublishDateElement = $(META_PUBLISH_DATE_SELECTOR, html).html()
  if (metaPublishDateElement) {
    try {
      const yoastContent = JSON.parse(metaPublishDateElement)
      const yoastGraph = yoastContent['@graph']
      let publishDate: undefined | string
      if (
        typeof yoastGraph === 'object' &&
        typeof yoastGraph.forEach === 'function'
      ) {
        yoastGraph.forEach((graph: {[key: string]: any}) => {
          if (graph && typeof graph.datePublished === 'string') {
            publishDate = graph.datePublished
          }
        })
        if (publishDate) {
          return publishDate
        }
      }
    } catch (err) {
      throw new Error('Failed parse yoast meta')
    }
  }
  throw new Error('Cannot find any publish date meta')
}

type ChapterScrapperFn = (chapterUrl: string) => Promise<Chapter>

const chapterScrapper: ChapterScrapperFn = async (chapterUrl) => {
  try {
    const response = await axios.get(chapterUrl)
    const chapter: number = getChapterNumber(response.data)
    const publishDate: string = getPublishDate(response.data)
    const contents: Content[] = getChapterContent(response.data)

    return {
      chapter,
      publishDate,
      contents,
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

export default chapterScrapper
