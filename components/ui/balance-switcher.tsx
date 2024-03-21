import clsx from 'clsx'
import Image from 'next/image'

const BalanceSwitcher = () => {
  const isDrax = true
  return (
    <div className={s.balance_switcher_wrap}>
      <div className={s.balance_switcher_block}>
        <div className={clsx(s.balance_switcher_item, !isDrax && s.active)}>
          <Image src={bonusTokenIco} width={} height={} alt='bonus-ico' />1
          <span>&nbsp;bc</span>
        </div>
        <div className={clsx(s.balance_switcher_item, isDrax && s.active)}>
          <Image src={draxTokenIco} width={} height={} alt='bonus-ico' />

          <span>&nbsp;dc</span>
        </div>
      </div>
    </div>
  )
}

export { BalanceSwitcher }
