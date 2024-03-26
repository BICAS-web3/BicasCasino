export const stringRemoveSpacing = (value: string) => {
  return value.split(' ').join('_').toLocaleLowerCase()
}
