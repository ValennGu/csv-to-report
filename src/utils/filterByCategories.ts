export const filterByCategories = (category: string, data: { [key: string]: string }[]) => {
  const nonIncomeItems = [...data].filter((elem) => elem['Category'] !== 'Nomina')

  if (category === 'All') {
    return nonIncomeItems
  }

  return nonIncomeItems.filter((elem) => elem['Category'].includes(category))
}
