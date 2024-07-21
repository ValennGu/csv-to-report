export const getHeadersFromCSV = (csv: string) => {
  return csv
    .split('\n')[0]
    .split(',')
    .map((header) => header.trim())
    .filter((header) => header !== '')
}
