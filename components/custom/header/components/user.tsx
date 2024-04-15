import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const User = () => {
  const navigation = useRouter()
  const { data, status } = useSession()

  const handleLogout = () => {
    if (status === 'authenticated') {
      signOut().then(() => navigation.push('/auth/registration'))
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant='ghost'
      className='cursor-pointer w-10 aspect-square flex items-center justify-center rounded-full bg-orange-400 text-white'
    >
      {data ? (
        <span>{data.user!.name!.slice(0, 2).toLocaleUpperCase()}</span>
      ) : (
        <div>LO</div>
      )}
    </Button>
  )
}

export default User
