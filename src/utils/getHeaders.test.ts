import { describe, it, expect } from 'vitest'
import { getHeadersFromCSV } from './getHeaders'

describe('getHeaders', () => {
  it('should return an array of headers', () => {
    const csv = `header1,header2,header3
    content1,content2,content3`

    expect(getHeadersFromCSV(csv)).toStrictEqual(['header1', 'header2', 'header3'])
  })

  it('should return an array of headers and remove white spaces', () => {
    const csv = `header1, header2, header3
    content1, content2, content3`

    expect(getHeadersFromCSV(csv)).toStrictEqual(['header1', 'header2', 'header3'])
  })

  it('should return an array of headers and remove last empty item', () => {
    const csv = `header1, header2, header3, 
    content1, content2, content3`

    expect(getHeadersFromCSV(csv)).toStrictEqual(['header1', 'header2', 'header3'])
  })
})
