import { describe, it, expect } from 'vitest'
import { getDataFromCsv } from './getData'

describe('getData', () => {
  it('should return and object with headers as properties', () => {
    const csv = `header1, header2\ncontent1, content2`
    const headers = ['header1', 'header2']
    const expectedResult = [
      {
        header1: 'content1',
        header2: 'content2'
      }
    ]

    expect(getDataFromCsv(csv, headers)).toStrictEqual(expectedResult)
  })

  it('should return and object with whitespace free content', () => {
    const csv = `header1, header2\ncontent1 , content2    `
    const headers = ['header1', 'header2']
    const expectedResult = [
      {
        header1: 'content1',
        header2: 'content2'
      }
    ]

    expect(getDataFromCsv(csv, headers)).toStrictEqual(expectedResult)
  })
})
