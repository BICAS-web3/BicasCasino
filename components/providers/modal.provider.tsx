import { MelRules } from '@/app/melSlots/components/MelRules/MelRules'
import { HeaderMenu } from '../custom/header/components/menu/HeaderMenu'
import { Payment, Purchase } from '../custom/header/components/modals'
import { UserModal } from '../custom/userModal/UserModal'
import { useUnit } from 'effector-react'
import { PaymentModel } from '@/states'
import Transactions from '../custom/header/components/modals/payment/transactions'

// import Payment from '@/components/custom/Payment/Payment'

const ModalProvider = () => {
  const [showTransaction, setShowTransaction] = useUnit([
    PaymentModel.$showTransaction,
    PaymentModel.setShowTransaction
  ])
  return (
    <>
      {showTransaction ? <Transactions /> : <Payment />}
      <Purchase />
      <HeaderMenu />
      <UserModal />
      {/* <Registration /> */}
    </>
  )
}

export default ModalProvider
