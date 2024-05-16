import { getTokensBilliane } from '@/api'
import { PaymentModel, RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { BilllineLogoSVG, DraxMiniSVG, RedirectSVG } from '../../../icons'
import BackItem from '../../conponents/back.item'
import InputItem from './components/input'
import { useTranslation } from 'react-i18next'

const Billline = () => {
  const [setIsBillline, access_token, showNotification] = useUnit([
    PaymentModel.setIsBillline,
    RegistrModel.$access_token,
    UserModel.$showNotification
  ])

  const [name, setName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [address, setAddress] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')
  const [error, setError] = useState(false)
  const [cpf, setCpf] = useState('')

  function validateEmail(email: string): boolean {
    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const [responseData, setResponseData] = useState<null | {
    merchant: string
    order: string
    amount: string
    currency: string
    item_name: string
    first_name: string
    last_name: string
    user_id: string
    payment_url: string
    country: string
    ip: string
    custom: string
    email: string
    phone: string
    address: string
    city: string
    post_code: string
    region: string
    lang: string
    cpf: null | any
  }>(null)

  const handlePayment = async () => {
    if (
      !name ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !country ||
      !region ||
      !address ||
      !amount ||
      !zipCode
    ) {
      setError(true)
      showNotification && toast(t(`toast.fill_all`))
    } else {
      if (!validateEmail(email)) {
        showNotification && toast(t(`toast.email`))
      } else {
        const data = await getTokensBilliane({
          amount,
          address,
          bareer: access_token,
          city,
          country,
          currency,
          email,
          first_name: name,
          last_name: lastName,
          phone,
          post_code: zipCode,
          region
        })
        if (data.status === 'OK') {
          setResponseData((data.body as any).data)
        } else {
          showNotification && toast(t(`toast.error`))
        }
      }
    }
  }

  useEffect(() => {
    if (responseData !== null) {
      const url = new URL(`https://paycareforyou.com/payment/form`)
      url.searchParams.set('merchant', responseData.merchant)
      url.searchParams.set('order', responseData.order)
      url.searchParams.set('amount', responseData.amount)
      url.searchParams.set('currency', responseData.currency)
      url.searchParams.set('item_name', responseData.item_name)
      url.searchParams.set('first_name', responseData.first_name)
      url.searchParams.set('last_name', responseData.last_name)
      url.searchParams.set('user_id', responseData.user_id)
      url.searchParams.set('payment_url', responseData.payment_url)
      url.searchParams.set('country', responseData.country)
      url.searchParams.set('ip', responseData.ip)
      url.searchParams.set('custom', responseData.custom)
      url.searchParams.set('email', responseData.email)
      url.searchParams.set('phone', responseData.phone)
      url.searchParams.set('address', responseData.address)
      url.searchParams.set('city', responseData.city)
      url.searchParams.set('post_code', responseData.post_code)
      url.searchParams.set('region', responseData.region)
      url.searchParams.set('lang', 'en')
      if (cpf) {
        url.searchParams.set('cpf', cpf)
      }

      console.log(url.href)
      window.open(url.href, '_blank')
    }
  }, [responseData])

  const { t } = useTranslation()

  return (
    <div className='w-full h-full flex-auto flex flex-col gap-[18px]'>
      <div className='w-full flex justify-between items-center'>
        <BackItem onClick={() => setIsBillline(false)} />
      </div>
      <div className='w-full flex flex-col gap-[14px] items-center'>
        <h2 className='text-center text-[19px] text-[#7E7E7E] font-medium'>
          {t(`modals.wallet.billine.title`)}
        </h2>
        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={name}
            setValue={setName}
            title={t(`modals.wallet.billine.first`)}
            placeholder={t(`modals.wallet.billine.name`)}
            setError={setError}
            error={error && !name}
          />
          <InputItem
            value={lastName}
            setValue={setlastName}
            title={t(`modals.wallet.billine.last`)}
            placeholder={t(`modals.wallet.billine.name`)}
            setError={setError}
            error={error && !lastName}
          />
        </div>
        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={email}
            setValue={setEmail}
            title={t(`modals.wallet.billine.mail`)}
            placeholder={t(`modals.wallet.billine.mail_address`)}
            setError={setError}
            error={error && !email}
          />
          <InputItem
            value={phone}
            setValue={setPhone}
            title={t(`modals.wallet.billine.phone`)}
            placeholder={t(`modals.wallet.billine.phone_number`)}
            setError={setError}
            error={error && !phone}
          />
        </div>
        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={country}
            setValue={setCountry}
            title={`*${t(`modals.wallet.billine.country`)}`}
            placeholder={t(`modals.wallet.billine.country`)}
            setError={setError}
            error={error && !country}
          />
          <InputItem
            value={city}
            setValue={setCity}
            title={t(`modals.wallet.billine.city`)}
            placeholder=''
            setError={setError}
            error={error && !city}
          />
        </div>

        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={region}
            setValue={setRegion}
            title={t(`modals.wallet.billine.region`)}
            placeholder=''
            setError={setError}
            error={error && !region}
          />
          <InputItem
            value={cpf}
            setValue={setCpf}
            title={t(`modals.wallet.billine.cpf`)}
            placeholder='optional'
            setError={() => {}}
            error={false}
          />
        </div>

        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={address}
            setValue={setAddress}
            title={t(`modals.wallet.billine.address`)}
            placeholder={t(`modals.wallet.billine.street_address`)}
            setError={setError}
            error={error && !address}
          />
          <InputItem
            value={zipCode}
            setValue={setZipCode}
            title={t(`modals.wallet.billine.code`)}
            placeholder=''
            setError={setError}
            error={error && !zipCode}
          />
        </div>
        <div className='w-full flex gap-[10px] flex-auto'>
          <div className={`w-full flex flex-col flex-auto gap-1`}>
            <h3
              className={`text-[13px] font-light leading-[17px] h-[18px] duration-500 ${
                error ? 'text-[#FC3C37]' : 'text-[#979797]'
              }`}
            >
              {t(`modals.wallet.billine.amount`)}
            </h3>
            <div
              className={`relative flex flex-auto items-center h-full bg-[#121212] rounded-[8px] border px-[10px] gap-2 border-[#252525]`}
            >
              <input
                className={`w-[calc(100%-70px)] flex items-center duration-500 justify-between flex-auto h-10 bg-transparent text-[#979797] placeholder:text-[#464646] text-sm font-light`}
                value={amount}
                onChange={el => {
                  const numb = el.target.value
                  const num = Number(numb)
                  if (isNaN(num)) return
                  setAmount(numb)
                  if (error && !amount) {
                    setError(false)
                  }
                }}
                type='text'
                placeholder='10'
              />
              <DraxMiniSVG width={24} height={24} />
            </div>
          </div>
          <InputItem
            value={currency}
            setValue={setCurrency}
            title={t(`modals.wallet.billine.currency`)}
            placeholder=''
            setError={setError}
            error={error && !currency}
          />
        </div>
      </div>
      <button
        onClick={handlePayment}
        className={`mt-[2px] w-full text-center border flex items-center justify-center gap-[10px] rounded-[8px] h-11 font-bold duration-500 ${
          !name ||
          !lastName ||
          !email ||
          !phone ||
          !city ||
          !country ||
          !region ||
          !address ||
          !amount ||
          !zipCode
            ? 'bg-[#191919] border-[#363636] text-[#7E7E7E]'
            : 'bg-[#2520194D] border-[#907640] text-[#FFE09D] hover:bg-[#252019]'
        } `}
      >
        {t(`modals.wallet.billine.proceed`)}{' '}
        <RedirectSVG
          className={
            !name ||
            !lastName ||
            !email ||
            !phone ||
            !city ||
            !country ||
            !region ||
            !address ||
            !amount ||
            !zipCode
              ? 'text-[#7E7E7E] duration-500'
              : 'text-[#FFE09D] duration-500'
          }
        />
      </button>
    </div>
  )
}

export default Billline
