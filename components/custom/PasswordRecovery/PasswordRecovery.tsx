import { FC } from 'react'
import s from './styles.module.scss'
import { RegistrM } from '@/states'
import { useUnit } from 'effector-react'

interface PasswordRecoveryProps {}

export const PasswordRecovery: FC<PasswordRecoveryProps> = () => {
  const [isSignup, setIsSignup] = useUnit([
    RegistrM.$isSignup,
    RegistrM.setIsSignup
  ])

  return (
    <div className={s.recovery_block}>
      <div className={s.input_item}>
        <span className={s.input_item_title}>Email</span>
        <input type='text' className={s.input} />
      </div>
      <button className={s.reset_btn}>Reset Password</button>
      <span className={s.signIn_text} onClick={() => setIsSignup('in')}>
        Already have an account? <p>&nbsp;Sign In</p>
      </span>
    </div>
  )
}
