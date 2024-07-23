export const getUniqueCategories = (categories: string[]) => {
  return [...new Set(categories)]
}
