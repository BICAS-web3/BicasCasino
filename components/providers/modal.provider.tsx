import { MelRules } from '@/app/melSlots/components/MelRules/MelRules'
import { HeaderMenu } from '../custom/header/components/menu/HeaderMenu'
import { Payment, Purchase } from '../custom/header/components/modals'
import { UserModal } from '../custom/userModal/UserModal'

// import Payment from '@/components/custom/Payment/Payment'

const ModalProvider = () => {
  return (
    <>
      <Payment />
      <Purchase />
      <HeaderMenu />
      <UserModal />
      {/* <Registration /> */}
    </>
  )
}

export default ModalProvider
