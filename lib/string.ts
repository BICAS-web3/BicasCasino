import { toast } from 'sonner'

export const stringRemoveSpacing = (value: string) => {
  return value.split(' ').join('_').toLocaleLowerCase()
}
export const stringAddSpacing = (value: string) => {
  return value.split('_').join(' ')
}

export const copyToClipboard = (
  value: string,
  message: string = 'Successfully copied'
) => {
  navigator.clipboard.writeText(value)
  toast(message)
}
