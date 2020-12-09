import chapterScrapper from '../../src/App/Scrapper/chapterScrapper'
import {CHAPTER_TEST_PAGE} from '../mocks/htmldata'
import axios from 'axios'

jest.mock('axios')

const TEST_CHAPTER_URL = 'https://www.webtoon.xyz/read/secret-class/chapte/'
const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockResolvedValue({
  data: CHAPTER_TEST_PAGE,
})

describe('Scrapping chapter', () => {
  test('should scrap all content', async () => {
    const chapter = await chapterScrapper(TEST_CHAPTER_URL)
    expect(chapter).toEqual({
      chapter: 1,
      publishDate: '2020-05-22T12:12:19+00:00',
      contents: [
        {
          page: 1,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/001.jpg',
        },
        {
          page: 2,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/002.jpg',
        },
        {
          page: 3,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/003.jpg',
        },
        {
          page: 4,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/004.jpg',
        },
        {
          page: 5,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/005.jpg',
        },
        {
          page: 6,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/006.jpg',
        },
        {
          page: 7,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/007.jpg',
        },
        {
          page: 8,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/008.jpg',
        },
        {
          page: 9,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/009.jpg',
        },
        {
          page: 10,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/010.jpg',
        },
        {
          page: 11,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/011.jpg',
        },
        {
          page: 12,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/012.jpg',
        },
        {
          page: 13,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/013.jpg',
        },
        {
          page: 14,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/014.jpg',
        },
        {
          page: 15,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/015.jpg',
        },
        {
          page: 16,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/016.jpg',
        },
        {
          page: 17,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/017.jpg',
        },
        {
          page: 18,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/018.jpg',
        },
        {
          page: 19,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/019.jpg',
        },
        {
          page: 20,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/020.jpg',
        },
        {
          page: 21,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/021.jpg',
        },
        {
          page: 22,
          content:
            'https://cdn1.webtoon.xyz/manga_5ec7bf5a85234/chapter-1/022.jpg',
        },
      ],
    })
  })
})
