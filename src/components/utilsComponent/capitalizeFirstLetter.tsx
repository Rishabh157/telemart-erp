export const capitalizeFirstLetter = (value: string) => {
  if (typeof value !== 'string') {
      throw new Error('Input is not a string')
  }

  if (value.length === 0) {
      return value // Return an empty string as is
  }

  const firstLetter = value.charAt(0).toUpperCase()
  const restOfString = value.slice(1)

  return firstLetter + restOfString
}
