import { ChestCardModal } from '../custom/chestCard/ChestCardModal'
import { Payment, Purchase } from '../custom/header/components/modals'

// import Payment from '@/components/custom/Payment/Payment'

const ModalProvider = () => {
  return (
    <>
      <Payment />
      <Purchase />
      <ChestCardModal />
      {/* <Registration /> */}
    </>
  )
}

export default ModalProvider
