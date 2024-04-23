import { ChestCardModal } from '../custom/chestCard/ChestCardModal'
import { HistoryModal } from '../custom/chestCard/HistoryModal'
import { HeaderMenu } from '../custom/header/components/menu/HeaderMenu'
import { Payment, Purchase } from '../custom/header/components/modals'
import { UserModal } from '../custom/userModal/UserModal'
import { VaultModal } from '../custom/vault/VaultModal'
import { VipModal } from '../custom/vipModal/VipModal'

// import Payment from '@/components/custom/Payment/Payment'

const ModalProvider = () => {
  return (
    <>
      <Payment />
      <Purchase />
      <ChestCardModal />
      <HistoryModal />
      <HeaderMenu />
      <UserModal />
      <VaultModal />
      <VipModal />
      {/* <Registration /> */}
    </>
  )
}

export default ModalProvider
