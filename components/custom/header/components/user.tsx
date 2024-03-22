import { Button } from '@/components/ui/button'

const User = () => {
  const user = {
    name: 'Boris',
    surname: 'Yaremchenko'
  }
  return (
    <Button
      variant='ghost'
      className='cursor-pointer w-10 aspect-square flex items-center justify-center rounded-full bg-orange-400 text-white'
    >
      <span>{user.name.slice(0, 1).toLocaleUpperCase()}</span>
      <span>{user.surname.slice(0, 1).toLocaleUpperCase()}</span>
    </Button>
  )
}

export default User
