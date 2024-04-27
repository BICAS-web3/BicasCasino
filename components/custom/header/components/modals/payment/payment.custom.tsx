import {
  cancelTokenOrder,
  confirmOrder,
  createTokenOrder,
  createTokenSession,
  getImageFile,
  getOneTimeToken,
  getOrderInfo,
  getTokensBilliane,
  getTokensSettings,
  screenShootOrder
} from '@/api'
import { RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import {
  ChipSVG,
  CloseSVG,
  CopySVG,
  EclipseSVG,
  LogoSVG,
  RefreshSVG,
  TrashSVG
} from '../../icons'
import Logo from '../../logo'

const CustomPayment = ({ close }: { close: () => void }) => {
  const [file, setFile] = useState<any>(null)
  const [userInfo] = useUnit([UserModel.$userInfo])
  const [startPay, setStartPay] = useState(false)
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('')
  const [widgetSetting, setWidgetSetting] = useState<null | {
    merchant: { settings: { amount: { min: number; max: number } } }
  }>(null)
  const [sessionInit, setSessionInit] = useState<null | string>(null)
  const [screenShoot, setScreenShoot] = useState()
  useEffect(() => {
    ;(async () => {
      const data = await getTokensBilliane({
        address: '',
        amount: '',
        city: '',
        country: '',
        currency: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        post_code: '',
        region: ''
      })
    })()
  }, [])

  const [makeOrder, setMakeOrder] = useState<null | {
    orderId: string
    paymentDetails: {
      type: string
      value: string
      paymentMethodName: string
      ownerFirstName: string
      ownerLastName: string
      ownerPatronymic: string
    }
    amount: {
      amount: number
      amountText: string
    }
    orderCode: string
  }>(null)

  const [confirm, setConfirmOrder] = useState<null | {
    success: boolean
    createdAt: string
  }>(null)

  const [orderInfo, setOrderInfo] = useState<null | {
    orderId: string
    statusName: string
    statusId: number
    createdAt: string
    updatedAt: string
    timer: {
      startedAt: string
      finishAt: string
    }
  }>(null)

  const key = 'b645c063-8cd1-41fa-8cc9-7c3975109a43'
  const [access_token] = useUnit([RegistrModel.$access_token])

  useEffect(() => {
    if (access_token) {
      ;(async () => {
        const data = await getOneTimeToken({ bareer: access_token })
        // data && alert(JSON.stringify(data))
        if (data.status === 'OK') {
          setToken((data.body as any).token)
        }
      })()
    }
  }, [access_token])

  useEffect(() => {
    if (token && key) {
      ;(async () => {
        const data = await getTokensSettings({ token, apiKey: key })
        // alert(`${key} ${token}`)
        // data && alert(JSON.stringify(data))
        if (data.status === 'OK') {
          setWidgetSetting(data.body as any)
        }
      })()
    }
  }, [token, key])

  useEffect(() => {
    if (key && token && userInfo?.id) {
      ;(async () => {
        const data = await createTokenSession({
          apiKey: key,
          token,
          userId: `${userInfo?.id}`,
          callbackUrl: ''
        })
        // data && alert(`createTokenSession: ${JSON.stringify(data)}`)
        // data && alert(`createTokenSession: ${JSON.stringify(data)}`)
        console.log(22292992922992, data)
        setSessionInit((data as any).sessionId)
      })()
    }
  }, [token, key, userInfo])

  useEffect(() => {
    if (key && token && sessionInit && amount && startPay) {
      // alert(2)
      ;(async () => {
        const data = await createTokenOrder({
          amount: Number(amount),
          sessionId: sessionInit,
          token
        })
        // data && alert(`createTokenOrder: ${JSON.stringify(data)}`)
        if (data && (data as any)?.orderId) {
          setStartPay(false)
          setMakeOrder(data as any)
        }
      })()
    }
  }, [startPay])
  const [conf, setConf] = useState(false)
  useEffect(() => {
    if (makeOrder && token) {
      ;(async () => {
        const data = await confirmOrder({ orderId: makeOrder.orderId, token })

        // data && alert(`confirmOrder: ${JSON.stringify(data)}`)
        // data && setConfirmOrder(data as any)
        setConf(true)
        if (data.status === 'OK') {
        }
      })()
    }
  }, [makeOrder])

  // useEffect(() => {
  //   if (makeOrder?.orderId && conf) {
  //     ;(async () => {
  //       const data = await screenShootOrder({
  //         orderId: makeOrder.orderId,
  //         bucketS3ImageName: '710961381837.png'
  //       })
  //       // data && alert(`screenShootOrder: ${JSON.stringify(data)}`)
  //     })()
  //   }
  // }, [makeOrder, conf]) //!--------------------------------------------------------------------------------------------

  const [bucketUrl, setBucketUrl] = useState('')
  useEffect(() => {
    if (confirm && makeOrder) {
      ;(async () => {
        const data = await getOrderInfo({ orderId: makeOrder.orderId })
        data && alert(`getOrderInfo: ${JSON.stringify(data)}`)
        if (data.status === 'OK') {
          setOrderInfo(data.body as any)
        }
      })()
    }
  }, [confirm])

  useEffect(() => {
    if (conf) {
      ;(async () => {
        const data = await getImageFile({
          contentType: 'image/png',
          imageName: `${userInfo?.id}_${makeOrder?.orderId}.png`
        })
        data && (data as any)?.url && setBucketUrl((data as any).url)
        // data && alert(`getImageFile: ${JSON.stringify(data)}`)
      })()
    }
  }, [conf])

  const [send, setSend] = useState<any>('')

  function encodeImageFileAsURL(file) {
    const reader = new FileReader()
    reader.onloadend = function () {
      setSend(reader.result)
    }
    reader.readAsDataURL(file)
  }
  useEffect(() => {
    if (bucketUrl && file) {
      // ;(async () => {
      //   // const formData = new FormData()
      //   console.log(send)
      //   // formData.append('image', file, file.name)
      //   const response = await fetch(bucketUrl, {
      //     method: 'PUT',
      //     body: send,
      //     headers: {
      //       contentType: 'image/png'
      //     }
      //   })
      //     .then(async res => await res)
      //     .catch(e => e)
      //   console.log('Response data:', response)
      // })()
      ;(async () => {
        const formData = new FormData()
        formData.append(
          'image',
          file,
          `${userInfo?.id}_${makeOrder?.orderId}.png`
        )
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', bucketUrl, true)
        xhr.setRequestHeader('Content-Type', 'image/png')
        console.log(formData)
        xhr.send(formData)
      })()
    }
  }, [bucketUrl, file])

  const [cancelOrder, setCancelOrder] = useState(false)

  useEffect(() => {
    if (cancelOrder && makeOrder) {
      ;(async () => {
        await cancelTokenOrder({ orderId: makeOrder?.orderId, token })
        setCancelOrder(false)
      })()
    }
  }, [cancelOrder, makeOrder])

  return (
    <div className='w-screen sm:w-auto sm:h-auto h-screen z-[20] lg:w-[806px] lg:h-[470px] py-4 px-5 lg:p-[30px] pb-6 lg:pb-10 sm:rounded-[20px] flex flex-col bg-[#181818] overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <EclipseSVG className='absolute top-0 left-0 h-full' />
      <div className='flex items-center justify-between relative z-[1] gap-[19px]'>
        <Logo />
        {makeOrder && (
          <div className='hidden lg:flex w-full border border-[#3E3E3E] rounded-[45px] bg-[#121212] h-10 pr-[15px] mr-4'>
            <button className='flex items-center justify-center h-full bg-[#282828] w-[159px] font-[Montserrat] font-semibold rounded-[45px]'>
              08:46
            </button>
            <div className='flex items-center gap-9 ml-auto h-full'>
              <span className='text-[#AAAAAA] text-[12px]'>
                № {makeOrder?.orderId}
              </span>
              <span className='text-[#AAAAAA] text-[12px]'>26.04.2024</span>
            </div>
          </div>
        )}
        <CloseSVG onClick={close} className='cursor-pointer' />
      </div>
      {makeOrder ? (
        <>
          {' '}
          <div className='flex mt-2 lg:hidden w-full border border-[#3E3E3E] rounded-[45px] bg-[#121212] h-7 lg:h-10 pr-[10px] lg:pr-[15px] mr-0 lg:mr-4'>
            <button className='flex items-center justify-center h-full bg-[#282828] text-[10px] lg:text-base w-[70px] lg:w-[159px] font-[Montserrat] font-semibold rounded-[45px]'>
              08:46
            </button>
            <div className='flex items-center gap-2 lg:gap-9 ml-auto h-full'>
              <span className='text-[#AAAAAA] text-[8px] lg:text-[12px] text-center mx-auto'>
                № {makeOrder?.orderId}
              </span>
              <span className='text-[#AAAAAA] text-[9px] lg:text-[12px]'>
                26.04.2024
              </span>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row h-full pt-4 lg:pt-5 gap-2 lg:gap-[23px] relative z-[1]'>
            <div className='flex flex-col gap-[13px] lg:pr-[13px] lg:border-r border-[#3E3E3E]'>
              <div className='flex flex-col gap-1'>
                <div className='w-[198px] min-w-[198px] h-[114px] bg-[linear-gradient(245.54deg,#89450D_24.36%,#100000_100%)] rounded-[6px] p-[8px] relative flex flex-col'>
                  <ChipSVG className='absolute left-4 bottom-[33px] w-[23px] h-[17px]' />{' '}
                  <LogoSVG className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[96px] h-[74px]' />
                  <h2
                    // onClick={() => alert(1)}
                    className='mt-[3px] mr-[3px] ml-auto max-w-[116px] text-[11px] font-semibold leading-[14px] uppercase text-right'
                  >
                    Автоматически самый быстрый банк
                  </h2>
                  <p className='mt-auto flex gap-1 text-[10px]'>
                    <span>0123</span>
                    <span>4567</span>
                    <span>8901</span>
                    <span>2345</span>
                  </p>
                </div>
                <h2 className='lg:hidden block text-base lg:text-xl font-semibold lg:max-w-[426px]'>
                  Войдите в интернет-банк и переведите точную сумму
                </h2>
              </div>

              <div className='flex flex-col gap-1 lg:gap-[19px] lg:max-w-[198px] lg:ml-[10px]'>
                <p className='text-[#AAAAAA] text-[12px] lg:text-[13px] leading-[15px] lg:leading-[17.7px]'>
                  Войдите в интернет-банк и переведите точную сумму
                </p>
                <p className='text-[#AAAAAA] text-[12px] lg:text-[13px] leading-[15px] lg:leading-[17.7px]'>
                  В назначении платежа укажите код ..
                </p>
                <p className='text-[#AAAAAA] text-[12px] lg:text-[13px] leading-[15px] lg:leading-[17.7px]'>
                  Перевод должен быть совершен одной транзакцией
                </p>
                <p className='text-[#AAAAAA] text-[12px] lg:text-[13px] leading-[15px] lg:leading-[17.7px]'>
                  Переводы с терминалов не принимаются
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-4 lg:gap-[45px] w-full relative z-[1]'>
              <h2 className='hidden lg:block text-lg lg:text-xl font-semibold lg:max-w-[426px]'>
                Войдите в интернет-банк и переведите точную сумму
              </h2>
              <div className='flex flex-col gap-3 lg:gap-[18px]'>
                <div className='flex flex-col gap-2 lg:gap-[14px]'>
                  <div className='flex w-full items-end'>
                    <span className='min-w-max text-[13px] lg:text-[15px] text-[#7E7E7E]'>
                      Сумма оплаты:
                    </span>
                    <div className='w-full border-b-[2px] border-dotted flex-[1_1_auto]'></div>
                    <span className='text-[#FFE09D] text-base lg:text-[28px] font-semibold leading-[30px]'>
                      {amount}UAH
                    </span>
                  </div>
                  <div className='flex w-full justify-between items-center gap-[27px]'>
                    <span className='min-w-max text-[13px] lg:text-[15px] text-[#7E7E7E]'>
                      Номер карты:
                    </span>
                    <div className='w-full max-w-[310px] flex justify-between border border-[#3E3E3E] rounded-[8px] bg-[#121212] pl-[14px] pr-5 h-8 lg:h-9 items-center'>
                      <p className='text-[#AAAAAA] font-light text-[12px] lg:text-base'>
                        {makeOrder.paymentDetails.value}
                      </p>{' '}
                      <CopySVG className='text-[#7E7E7E] cursor-pointer scale-[0.7] lg:scale-[1] w-5 h-5' />
                    </div>
                  </div>
                  <div className='flex w-full justify-between items-center gap-[27px]'>
                    <span className='min-w-max text-[13px] lg:text-[15px] text-[#7E7E7E]'>
                      Назначение платежа:
                    </span>
                    <div className='w-full max-w-[310px] flex justify-between border border-[#3E3E3E] rounded-[8px] bg-[#121212] pl-[14px] pr-5 h-8 lg:h-9 items-center'>
                      <p className='text-[#AAAAAA] font-light text-[12px] lg:text-base'>
                        {makeOrder.paymentDetails.paymentMethodName}
                      </p>
                      <CopySVG className='text-[#7E7E7E] cursor-pointer scale-[0.7] lg:scale-[1] w-5 h-5' />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col ml-auto gap-3 lg:gap-[22px] max-w-[310px] w-full'>
                  <div className='w-full border border-dashed border-[#3E3E3E] bg-[#121212] h-9 lg:h-10 rounded-[99px] flex justify-between pl-[14px] pr-5 items-center'>
                    <span></span>
                    <label
                      className='text-[13px] text-[#FFE09D] underline relative'
                      htmlFor='input__file'
                    >
                      Выбрать файл
                      <input
                        onChange={e => {
                          e?.target?.files && setFile(e?.target?.files[0])
                          // encodeImageFileAsURL(e?.target?.files[0])
                        }}
                        id='input__file'
                        className='absolute t0 left-0 w-0 h-0'
                        type='file'
                      />
                    </label>
                    <div className='flex items-center gap-[10px]'>
                      <TrashSVG />
                      <RefreshSVG />
                    </div>
                  </div>
                  <div className='w-full flex gap-[10px] h-9 lg:h-10'>
                    <button
                      onClick={() => setCancelOrder(true)}
                      className='cursor-pointer flex items-center justify-center text-[#979797] rounded-[8px] w-full border border-[#363636]'
                    >
                      отменить
                    </button>
                    <button className='cursor-pointer flex items-center justify-center text-[#464646] rounded-[8px] w-full border border-[#363636] bg-[#202020]'>
                      продолжить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex flex-col lg:flex-row items-center mt-5 lg:mt-[64px] gap-5 lg:gap-[25px] relative z-[1]'>
            <div className='w-[300px] sm:w-[351px] min-w-[300px] lg:min-w-[351px] h-[180px] sm:h-[203px] bg-[linear-gradient(245.54deg,#89450D_24.36%,#100000_100%)] rounded-xl p-[15px] relative flex flex-col'>
              <ChipSVG className='absolute left-[26px] bottom-[52px] w-[40px] h-[30px]' />
              <LogoSVG className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[171px] h-[132px]' />

              <h2
                // onClick={() => alert(1)}
                className='mt-[5px] mr-[5px] ml-auto max-w-[204px] text-xl font-semibold leading-[26px] uppercase text-right'
              >
                Автоматически самый быстрый банк
              </h2>
              <p className='mt-auto flex gap-2 text-[18px]'>
                <span>0123</span>
                <span>4567</span>
                <span>8901</span>
                <span>2345</span>
              </p>
            </div>
            <div className='flex flex-col'>
              <h2 className='text-2xl lg:text-[35px] font-semibold leading-[38px]'>
                Оплата услуг стала еще быстрее
              </h2>
              <div className='mt-5 lg:mt-[38px] border border-[#3E3E3E] bg-[#121212] rounded-[8px] flex w-full justify-between p-[10px] pr-5 h-[39px] items-center'>
                <input
                  onChange={el => {
                    if (!Number(el.target.value) && el.target.value !== '')
                      return
                    setAmount(el.target.value)
                  }}
                  value={amount}
                  className='bg-transparent text-sm text-[#626262] placeholder:text-[#626262] w-[70%]'
                  type='text'
                  placeholder='Лимит суммы 100 - 29 999'
                />
                <span className='text-[#626262] text-sm'>UAH</span>
              </div>
              <span className='mt-[10px] text-[13px] text-[#7E7E7E]'>
                * Введите сумму в гривнах
              </span>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-end justify-between mt-2 lg:mt-[43px] relative z-[1]'>
            <p className='lg:max-w-[227px] text-[13px] text-[#7E7E7E]'>
              * Самый быстрый путь в банк будет определен автоматически
            </p>
            <button
              disabled={!amount || !sessionInit}
              onClick={() => setStartPay(true)}
              className={`mt-2 lg:mt-0 font-medium duration-500 text-[#7E7E7E] px-[47.5px] py-[17px] w-full lg:w-fit leading-4 flex items-center justify-center border rounded-[8px] bg-[#202020] ${
                amount ? 'border-[#363636]' : 'border-transparent'
              }`}
            >
              Продолжить
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CustomPayment
