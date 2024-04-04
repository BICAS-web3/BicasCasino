import Registration from '@/components/custom/registration'
import SignUp from './(components)/signup'

const RegistrPage = () => {
  return (
    <Registration isSignup='up' title='Registration'>
      <SignUp />
    </Registration>
  )
}

export default RegistrPage
