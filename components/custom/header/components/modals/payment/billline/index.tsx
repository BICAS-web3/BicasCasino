import { getTokensBilliane } from '@/api'
import { PaymentModel, RegistrModel } from '@/states'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { BilllineLogoSVG, DraxMiniSVG, RedirectSVG } from '../../../icons'
import BackItem from '../../conponents/back.item'
import InputItem from './components/input'

const Billline = () => {
  const [setIsBillline, access_token] = useUnit([
    PaymentModel.setIsBillline,
    RegistrModel.$access_token
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
      toast('Fill all fields!')
    } else {
      if (!validateEmail(email)) {
        toast('Error with email!')
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
          toast('Error!')
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

  return (
    <div className='w-full h-full flex-auto flex flex-col gap-[18px]'>
      <div className='w-full flex justify-between items-center'>
        <BackItem onClick={() => setIsBillline(false)} />
        <BilllineLogoSVG />
      </div>
      <div className='w-full flex flex-col gap-[14px] items-center'>
        <h2 className='text-center text-[19px] text-[#7E7E7E] font-medium'>
          Few quick steps to deposit:
        </h2>
        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={name}
            setValue={setName}
            title='*First Name'
            placeholder='Your Name'
            setError={setError}
            error={error && !name}
          />
          <InputItem
            value={lastName}
            setValue={setlastName}
            title='*Last Name'
            placeholder='Your Name'
            setError={setError}
            error={error && !lastName}
          />
        </div>
        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={email}
            setValue={setEmail}
            title='*Email'
            placeholder='Email address'
            setError={setError}
            error={error && !email}
          />
          <InputItem
            value={phone}
            setValue={setPhone}
            title='*Phone'
            placeholder='Phone number'
            setError={setError}
            error={error && !phone}
          />
        </div>
        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={country}
            setValue={setCountry}
            title='*Country'
            placeholder='Country'
            setError={setError}
            error={error && !country}
          />
          <InputItem
            value={city}
            setValue={setCity}
            title='*City'
            placeholder=''
            setError={setError}
            error={error && !city}
          />
        </div>

        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={region}
            setValue={setRegion}
            title='*Region'
            placeholder=''
            setError={setError}
            error={error && !region}
          />
          <InputItem
            value={cpf}
            setValue={setCpf}
            title='CPF, for PIX'
            placeholder='optional'
            setError={() => {}}
            error={false}
          />
        </div>

        <div className='w-full flex gap-[10px] flex-auto'>
          <InputItem
            value={address}
            setValue={setAddress}
            title='*Address'
            placeholder='Street, Apt/Suite'
            setError={setError}
            error={error && !address}
          />
          <InputItem
            value={zipCode}
            setValue={setZipCode}
            title='*Zip/Postal code'
            placeholder=''
            setError={setError}
            error={error && !zipCode}
          />
        </div>
        <div className='w-full flex gap-[10px] flex-auto'>
          <div className={`w-full flex flex-col flex-auto gap-1`}>
            <h3 className='text-[13px] text-[#979797] font-light leading-[17px] h-[18px]'>
              *Amount
            </h3>
            <div
              className={`relative flex flex-auto items-center h-full bg-[#121212] rounded-[8px] border px-[10px] gap-2  ${
                error
                  ? 'border-[#f55252] placeholder:text-[#f55252]'
                  : 'border-[#252525] placeholder:text-[#979797]'
              }`}
            >
              <input
                className={`w-[calc(100%-70px)] flex items-center duration-500 justify-between flex-auto h-10 bg-transparent text-[#979797] text-sm font-light`}
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
                placeholder={error ? 'Empty!' : '10'}
              />
              <DraxMiniSVG width={24} height={24} />
            </div>
          </div>
          <InputItem
            value={currency}
            setValue={setCurrency}
            title='*Currency'
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
        Proceed{' '}
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
