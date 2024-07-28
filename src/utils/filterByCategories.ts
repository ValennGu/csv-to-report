export const filterByCategories = (category: string, data: { [key: string]: string }[]) => {
  if (category === 'All') {
    return [...data]
  }

  return [...data].filter((elem) => elem['Category'].includes(category))
}
