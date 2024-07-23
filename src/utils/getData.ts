export const getDataFromCsv = (csv: string, headers: string[]) => {
  const data = csv.split('\n')
  data.shift()

  return data.map((row) => {
    return createObjectFromHeaders(row, headers)
  })
}

const createObjectFromHeaders = (row: string, headers: string[]) => {
  const obj: { [key: string]: string } = {}

  const values = row.split(',').map((prop) => prop.trim())

  for (const index in headers) {
    const prop = headers[index]

    if (prop === 'Amount') {
      obj[prop] = getAmount(values[index])
    } else {
      obj[prop] = values[index]
    }
  }

  return obj
}

export const getAmount = (amount: string) => {
  return `${amount} €`
}
