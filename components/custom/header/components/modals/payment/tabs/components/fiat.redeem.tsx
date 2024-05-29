import { Button } from '@/components/ui/button'
import InputItem from '../../billline/components/input'
import { useEffect, useState } from 'react'
import { RedirectSVG } from '../../../../icons'
import { useTranslation } from 'react-i18next'
import { useUnit } from 'effector-react'
import { RegistrModel, UserModel } from '@/states'
import { toast } from 'sonner'
import { getUserAmounts, payoutWithdraw } from '@/api'

const FiatRedeem = () => {
  const [error, setError] = useState(false)
  const [card, setCard] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [amount, setAmount] = useState('')
  const { t } = useTranslation()
  const [access_token, showNotification, userInfo] = useUnit([
    RegistrModel.$access_token,
    UserModel.$showNotification,
    UserModel.$userInfo
  ])

  const [balanceValue, setBalanceValue] = useState(0)

  useEffect(() => {
    if (access_token && userInfo) {
      ;(async () => {
        const data = await getUserAmounts({
          bareer: access_token,
          userId: userInfo?.id
        })
        if (data.status === 'OK') {
          setBalanceValue(
            Number(
              (data.body as any).amounts.find(
                (item: any) => item.name === 'Drax'
              )?.amount
            )
          )
        }
      })()
    }
  }, [access_token, userInfo?.id])

  const handlePayment = async () => {
    if (!firstName || !lastName || !card || !amount) {
      setError(true)
      showNotification && toast(t(`toast.fill_all`))
    } else {
      if (Number(amount) > balanceValue) {
        showNotification && toast(t(`Top up balance!`))
        return
      }
      const data = await payoutWithdraw({
        amount,
        bareer: access_token,
        additional_data: JSON.stringify({ firstName, lastName, card })
      })
      if (data.status === 'OK') {
        toast(t(`toast.success`))
      } else {
        showNotification && toast(t(`toast.error`))
      }
    }
  }

  return (
    <div className='flex flex-col gap-[14px] h-full justify-start mt-0'>
      <InputItem
        className='h-fit max-h-fit'
        placeholder='0000 0000 0000 0000'
        title='*Bank Card'
        setValue={setCard}
        error={error}
        setError={setError}
        value={card}
        isNumber
      />
      <div className='w-full gap-2.5 flex'>
        <InputItem
          className='h-fit max-h-fit'
          placeholder='Your Name'
          title='*First Name'
          setValue={setFirstName}
          error={error}
          setError={setError}
          value={firstName}
        />
        <InputItem
          className='h-fit max-h-fit'
          placeholder='Your Last Name'
          title='*Last Name'
          setValue={setLastName}
          error={error}
          setError={setError}
          value={lastName}
        />
      </div>
      <InputItem
        className='h-fit max-h-fit'
        placeholder='10'
        title='*Amount to withdraw'
        setValue={setAmount}
        error={error}
        setError={setError}
        value={amount}
      />
      <div className='mt-5 p-2.5 pr-5 rounded-lg bg-[#212121] flex flex-col gap-[10px]'>
        <p className='text-[13px] text-[#979797] leading-[17px]'>
          Disclaimer: <br />1) The exact amount you receive is subject to real-time
          exchange rate and the actual send amount at the time arrival.
        </p>
        <div className='w-full h-[1px] bg-[#363636]'></div>
        <p className='text-[13px] text-[#979797] leading-[17px]'>
          2) Withdrawals are processed manually and may take some time, you can
          track the status on the{' '}
          <span className='text-[#FFE09D] underline'>Transactions</span> page.
        </p>
      </div>
      <button
        onClick={handlePayment}
        className={`mt-auto w-full text-center border flex items-center justify-center gap-[10px] rounded-[8px] h-11 font-bold duration-500 ${
          !firstName || !lastName || !card || !amount
            ? 'bg-[#191919] border-[#363636] text-[#7E7E7E]'
            : 'bg-[#2520194D] border-[#907640] text-[#FFE09D] hover:bg-[#252019]'
        } `}
      >
        {t(`modals.wallet.billine.proceed`)}{' '}
        <RedirectSVG
          className={
            !firstName || !lastName || !card || !amount
              ? 'text-[#7E7E7E] duration-500'
              : 'text-[#FFE09D] duration-500'
          }
        />
      </button>
    </div>
  )
}

export default FiatRedeem
