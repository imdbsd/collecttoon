import chapterScrapper from '../../src/App/Scrapper/chapterScrapper'
import {CHAPTER_TEST_PAGE} from '../mocks/chapter/CHAPTER_TEST_PAGE'
import {INVALID_CHAPTER_TEST_PAGE} from '../mocks/chapter/INVALID_CHAPTER_TEST_PAGE'
import {TEST_CHAPTER_RESPONSE} from '../mocks/chapterResponse'
import axios from 'axios'

jest.mock('axios')

const TEST_CHAPTER_URL = 'https://www.webtoon.xyz/read/secret-class/chapter-1/'
const TEST_INVALID_CHAPTER_URL =
  'https://www.webtoon.xyz/read/secret-class/chapter-1/'
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Scrapping chapter', () => {
  test('should scrap all content', async () => {
    mockedAxios.get.mockResolvedValue({
      data: CHAPTER_TEST_PAGE,
    })
    const chapter = await chapterScrapper(TEST_CHAPTER_URL)
    mockedAxios.get.mockClear()
    expect(chapter).toEqual(TEST_CHAPTER_RESPONSE)
  })

  test('Shoud throw error when scrap undefined chapter', async () => {
    try {
      mockedAxios.get.mockResolvedValue({
        data: INVALID_CHAPTER_TEST_PAGE,
      })
      await chapterScrapper(TEST_INVALID_CHAPTER_URL)
    } catch (err) {
      expect(err.message).toMatch('invalid chapter number')
    }
    mockedAxios.get.mockClear()
  })
})
