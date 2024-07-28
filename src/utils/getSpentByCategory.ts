export const getSpentByCategory = (expenses: { [key: string]: string }[], category: string) => {
  return Math.abs(
    expenses
      .filter((e) => e['Category'] === category)
      .reduce((total, curr) => total + parseFloat(curr['Amount']), 0)
  )
}

export const getSpent = (expenses: { [key: string]: string }[]) => {
  return Math.abs(expenses.reduce((total, curr) => total + parseFloat(curr['Amount']), 0))
}
