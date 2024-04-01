import Registration from '@/components/custom/Registration'
import Signin from './(components)/signin'

const LoginPage = () => {
  return (
    <Registration isSignup='in' title='Registration'>
      <Signin />
    </Registration>
  )
}

export default LoginPage
