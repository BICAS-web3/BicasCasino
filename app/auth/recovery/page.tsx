import Registration from '@/components/custom/Registration'
import PasswordRecovery from './(components)/password.recovery'

const RecoveryPage = () => {
  return (
    <Registration title='Password recovery' isSignup='recovery'>
      <PasswordRecovery />
    </Registration>
  )
}

export default RecoveryPage
