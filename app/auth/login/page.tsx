import Registration from '@/components/custom/registration'
import Signin from './(components)/signin'

const LoginPage = () => {
  return (
    <Registration isSignup='in' title='Registration'>
      <Signin />
    </Registration>
  )
}

export default LoginPage
