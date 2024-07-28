export enum Categories {
  'All',
  'Mortgage',
  'Home',
  'Investment',
  'Groceries',
  'Gas',
  'Gym',
  'Cats',
  'Services',
  'Eating Out',
  'Extra'
}

export const getCategories = () => {
  return Object.values(Categories).filter((elem) => typeof elem !== 'number')
}
