import { ChestCardModal } from '../custom/chestCard/ChestCardModal'
import { HistoryModal } from '../custom/chestCard/HistoryModal'
import { Payment, Purchase } from '../custom/header/components/modals'

// import Payment from '@/components/custom/Payment/Payment'

const ModalProvider = () => {
  return (
    <>
      <Payment />
      <Purchase />
      <ChestCardModal />
      <HistoryModal />
      {/* <Registration /> */}
    </>
  )
}

export default ModalProvider
