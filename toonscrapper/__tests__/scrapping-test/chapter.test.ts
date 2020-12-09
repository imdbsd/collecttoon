import chapterScrapper from '../../src/App/Scrapper/chapterScrapper'
import {CHAPTER_TEST_PAGE} from '../mocks/htmldata'
import {TEST_CHAPTER_RESPONSE} from '../mocks/chapterResponse'
import axios from 'axios'

jest.mock('axios')

const TEST_CHAPTER_URL = 'https://www.webtoon.xyz/read/secret-class/chapter-1/'
const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockResolvedValue({
  data: CHAPTER_TEST_PAGE,
})

describe('Scrapping chapter', () => {
  test('should scrap all content', async () => {
    const chapter = await chapterScrapper(TEST_CHAPTER_URL)
    expect(chapter).toEqual(TEST_CHAPTER_RESPONSE)
  })
})
