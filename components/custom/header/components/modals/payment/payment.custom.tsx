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
import { toast } from 'sonner'
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
import { LoaderIcon } from 'lucide-react'
import { useDropdown } from '@/lib/hooks/useDropdown'

const CustomPayment = ({ close }: { close: () => void }) => {
  const key = process.env.NEXT_PUBLIC_P2WAY_KEY
  const [done, setDone] = useState(false)
  const [payProcess, setPayProcess] = useState(false)
  const [fileType, setFileType] = useState('')
  const [fileExtension, setFileExtension] = useState('')
  const [file, setFile] = useState<any>(null)
  const [userInfo] = useUnit([UserModel.$userInfo])
  const [startPay, setStartPay] = useState(false)
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('')
  const [sessionInit, setSessionInit] = useState<null | string>(null)
  const [access_token] = useUnit([RegistrModel.$access_token])
  const [conf, setConf] = useState(false)
  const [send, setSend] = useState<any>(false)
  const [screen, setScreen] = useState('')
  const [finish, setFinish] = useState(false)
  const [bucketUrl, setBucketUrl] = useState('')
  const [cancelOrder, setCancelOrder] = useState(false)
  const [confirmData, setConfirmData] = useState<null | {
    success: boolean
    createdAt: string
  }>(null)
  const [widgetSetting, setWidgetSetting] = useState<null | {
    merchant: { settings: { amount: { min: number; max: number } } }
  }>(null)
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

  useEffect(() => {
    if (access_token) {
      ;(async () => {
        const data = await getOneTimeToken({ bareer: access_token })
        if (data.status === 'OK') {
          setToken((data.body as any).token)
        } else {
          toast(`Error: ${JSON.stringify(data)}`)
        }
      })()
    }
  }, [access_token])

  useEffect(() => {
    if (token && key) {
      ;(async () => {
        const data = await getTokensSettings({ token, apiKey: key })
        if ((data as any).merchant) {
          setWidgetSetting(data as any)
        } else {
          toast(`Error getting settings ${(data as any).error}`)
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
          callbackUrl: 'https://rew.greekkeepers.io/api/p2way/callback'
        })
        if ((data as any).sessionId) {
          setSessionInit((data as any).sessionId)
        } else {
          toast(`Error create session ${(data as any).error}`)
        }
      })()
    }
  }, [token, key, userInfo])

  useEffect(() => {
    if (key && token && sessionInit && amount && startPay) {
      ;(async () => {
        const data = await createTokenOrder({
          amount: Number(amount),
          sessionId: sessionInit,
          token
        })
        if (data && (data as any)?.orderId) {
          setStartPay(false)
          setMakeOrder(data as any)
        } else {
          toast(
            `${
              (data as any).error === 'NO_PAYMENT_METHODS_AVAILABLE'
                ? `${(data as any).error}, increase amount`
                : (data as any).error
            }`
          )
        }
        setStartPay(false)
      })()
    }
  }, [startPay])

  useEffect(() => {
    if (makeOrder && token && send) {
      ;(async () => {
        const data = await confirmOrder({ orderId: makeOrder.orderId, token })
        if ((data as any).success) {
          setConf(true)
          setConfirmData(data as any)
        } else {
          toast((data as any).error)
        }
      })()
    }
  }, [makeOrder, send])

  useEffect(() => {
    if (makeOrder?.orderId && send && screen) {
      ;(async () => {
        const data = await screenShootOrder({
          orderId: makeOrder.orderId,
          bucketS3DocumentName: screen
        })
        if ((data as any).message === 'OK') {
          toast('Добавляем скриншот')
          setSend(false)
          setScreen('')
          setFinish(true)
        } else {
          toast((data as any).error)
        }
      })()
    }
  }, [makeOrder, send, screen])

  useEffect(() => {
    if (finish && makeOrder) {
      ;(async () => {
        const data = await getOrderInfo({ orderId: makeOrder.orderId })
        if ((data as any).orderId) {
          toast('Ождиайте проверки и поступления!')
          setPayProcess(false)
          setDone(true)
        }
      })()
    }
  }, [finish])

  useEffect(() => {
    if (conf) {
      ;(async () => {
        const data = await getImageFile({
          contentType: fileType || 'image/png',
          imageName: `${confirmData?.createdAt}_${userInfo?.id}_${makeOrder?.orderId}.png`
        })
        data && (data as any)?.url && setBucketUrl((data as any).url)
      })()
    }
  }, [conf])

  useEffect(() => {
    if (bucketUrl && file) {
      ;(async () => {
        const ext = file.name.split('.').pop()
        setFileType(file.type)
        setFileExtension(ext)
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', bucketUrl, true)
        xhr.setRequestHeader('Content-Type', fileType || 'image/png')
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              setScreen(
                `${confirmData?.createdAt}_${userInfo?.id}_${makeOrder?.orderId}.png`
              )
            } else {
              toast(xhr.status)
            }
          }
        }
        xhr.send(file)
      })()
    }
  }, [bucketUrl, file])

  useEffect(() => {
    if (cancelOrder && !confirmData?.success && makeOrder) {
      ;(async () => {
        const data = await cancelTokenOrder({
          orderId: makeOrder?.orderId,
          token
        })
        if ((data as any).message === 'OK') {
          setCancelOrder(false)
          setMakeOrder(null)
          setFile(null)
          setAmount('')
          toast('Canceled!')
        } else {
          toast((data as any)?.error)
        }
      })()
    }
  }, [cancelOrder, makeOrder])

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // const { toggle, open, close: onClose, isOpen, dropdownRef } = useDropdown()

  // const [access_token, userInfo] = useUnit([
  //   RegistrModel.$access_token,
  //   UserModel.$userInfo
  // ])

  // // TODO: turn into a separate widget
  // const [otToken, setOtToken] = useState<any | undefined>()
  // useEffect(() => {
  //   ;(async () => {
  //     if (access_token && !otToken) {
  //       const response = await getOneTimeToken({ bareer: access_token })
  //       if (response.status === 'OK') {
  //         setOtToken((response as any).body)
  //         console.log('ONE TIME TOKEN---', response.body)
  //       } else {
  //         console.log('ONE TIME TOKEN ERROR', response.body)
  //       }
  //     }
  //   })()
  // }, [access_token, otToken])

  // const init = () => {
  //   if (otToken?.token && userInfo) {
  //     alert(2)
  //     const userId = userInfo.id.toString()
  //     const apiKey = process.env.NEXT_PUBLIC_P2WAY_KEY
  //     const callbackUrl = 'https://game.greekkeepers.io/api/p2way/callback'
  //     const token = otToken.token

  //     const params = { userId, apiKey, callbackUrl, token }

  //     window.initP2PWidget(params)
  //   }
  // }

  // // TODO: remove this effect
  // useEffect(() => {
  //   if (!isOpen) {
  //     setOtToken(undefined) // TODO: remove
  //   }
  // }, [isOpen])

  return (
    <>
      {/* <button
        onClick={() => {
          console.log(2)
          open()
          // setLink((prev) => prev + 1);

          init() // TODO: add a proper button, remove this line
        }}
        // className={s.wallet_btn}
      >
        open
      </button> */}
      <span className='fixed top-0 left-0  w-screen h-screen bg-black opacity-[0.4] z-[3]'></span>
      <div className='overflow-y-auto sm:overflow-y-hidden w-screen sm:w-auto sm:h-auto h-screen z-[20] lg:w-[806px] lg:h-[470px] pt-8 py-4 px-5 lg:p-[30px] pb-6 lg:pb-10 sm:rounded-[20px] flex flex-col bg-[#181818] overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <EclipseSVG className='absolute top-0 left-0 h-full' />
        <div className='flex items-center justify-between relative z-[1] gap-[19px]'>
          <Logo />
          {makeOrder && (
            <div className='hidden lg:flex w-full border border-[#3E3E3E] rounded-[45px] bg-[#121212] h-10 pr-[15px] mr-4'>
              <button className='flex items-center justify-center h-full bg-[#282828] w-[159px] font-[Montserrat] font-semibold rounded-[45px]'>
                {`${('0' + time.getHours()).slice(-2)}:${(
                  '0' + time.getMinutes()
                ).slice(-2)}`}
              </button>
              <div className='flex items-center gap-9 ml-auto h-full'>
                <span className='text-[#AAAAAA] text-[12px]'>
                  № {makeOrder?.orderId}
                </span>
                <span className='text-[#AAAAAA] text-[12px]'>
                  {`${`${new Date().getDate()}`.padStart(2, '0')}.${`${
                    new Date().getMonth() + 1
                  }`.padStart(2, '0')}.${new Date().getFullYear()}`}
                </span>
              </div>
            </div>
          )}
          <CloseSVG onClick={close} className='cursor-pointer' />
        </div>
        {makeOrder ? (
          <>
            <div className='flex mt-2 lg:hidden w-full border border-[#3E3E3E] rounded-[45px] bg-[#121212] h-7 lg:h-10 pr-[10px] lg:pr-[15px] mr-0 lg:mr-4'>
              <button className='flex items-center justify-center h-full bg-[#282828] text-[10px] lg:text-base w-[70px] lg:w-[159px] font-[Montserrat] font-semibold rounded-[45px]'>
                {`${('0' + time.getHours()).slice(-2)}:${(
                  '0' + time.getMinutes()
                ).slice(-2)}`}
              </button>
              <div className='flex items-center gap-2 lg:gap-9 ml-auto h-full'>
                <span className='text-[#AAAAAA] text-[8px] lg:text-[12px] text-center mx-auto'>
                  № {makeOrder?.orderId}
                </span>
                <span className='text-[#AAAAAA] text-[9px] lg:text-[12px]'>
                  {`${`${new Date().getDate()}`.padStart(2, '0')}.${`${
                    new Date().getMonth() + 1
                  }`.padStart(2, '0')}.${new Date().getFullYear()}`}
                </span>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row h-full pt-4 lg:pt-5 gap-2 lg:gap-[23px] relative z-[1]'>
              <div className='flex flex-col gap-[13px] lg:pr-[13px] lg:border-r border-[#3E3E3E]'>
                <div className='flex flex-col gap-1'>
                  <div className='w-[198px] min-w-[198px] h-[114px] bg-[linear-gradient(245.54deg,#89450D_24.36%,#100000_100%)] rounded-[6px] p-[8px] relative flex flex-col'>
                    <ChipSVG className='absolute left-4 bottom-[33px] w-[23px] h-[17px]' />{' '}
                    <LogoSVG className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[96px] h-[74px]' />
                    <h2 className='mt-[3px] mr-[3px] ml-auto max-w-[116px] text-[11px] font-semibold leading-[14px] uppercase text-right'>
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
                        <CopySVG
                          onClick={() => {
                            window.navigator.clipboard.writeText(
                              makeOrder.paymentDetails.value
                            )
                            toast('Copied!')
                          }}
                          className='text-[#7E7E7E] cursor-pointer scale-[0.7] lg:scale-[1] w-5 h-5'
                        />
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
                        <CopySVG
                          onClick={() => {
                            window.navigator.clipboard.writeText(
                              makeOrder.paymentDetails.paymentMethodName
                            )
                            toast('Copied!')
                          }}
                          className='text-[#7E7E7E] cursor-pointer scale-[0.7] lg:scale-[1] w-5 h-5'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col ml-auto gap-3 lg:gap-[22px] max-w-[100%] sm:max-w-[310px] w-full'>
                    <div className='w-full border border-dashed border-[#3E3E3E] bg-[#121212] h-9 lg:h-10 rounded-[99px] flex justify-between pl-[14px] pr-5 items-center'>
                      <span></span>
                      <label
                        className='text-[13px] text-[#FFE09D] underline relative cursor-pointer'
                        htmlFor='input__file'
                      >
                        {file ? 'Файл выбран!' : 'Выбрать файл'}

                        <input
                          onChange={e => {
                            e?.target?.files && setFile(e?.target?.files[0])
                          }}
                          id='input__file'
                          className='absolute t0 left-0 w-0 h-0'
                          type='file'
                        />
                      </label>
                      <div className='flex items-center gap-[10px]'>
                        <TrashSVG
                          className={file && 'cursor-pointer'}
                          onClick={() => setFile(null)}
                        />
                        {file ? (
                          <label
                            className='relative cursor-pointer'
                            htmlFor='input__file'
                          >
                            <RefreshSVG />
                            <input
                              onChange={e => {
                                e?.target?.files && setFile(e?.target?.files[0])
                              }}
                              id='input__file'
                              className='absolute t0 left-0 w-0 h-0'
                              type='file'
                            />
                          </label>
                        ) : (
                          <RefreshSVG />
                        )}
                      </div>
                    </div>
                    <div className='w-full flex gap-[10px] h-9 lg:h-10 sm:mt-0'>
                      <button
                        disabled={confirmData?.success}
                        onClick={() => {
                          setCancelOrder(true)
                        }}
                        className={`flex items-center justify-center duration-500 rounded-[8px] w-full border border-[#363636] ${
                          !confirmData?.success
                            ? 'text-white'
                            : 'text-[#979797]'
                        }`}
                      >
                        Отменить
                      </button>
                      <button
                        disabled={done}
                        onClick={() => {
                          if (!file) {
                            toast('Добавьте скриншот оплаты!')
                          } else {
                            setSend(true)
                            setPayProcess(true)
                            toast('Отправляем данные!')
                          }
                        }}
                        className={`flex gap-2 items-center justify-center rounded-[8px] w-full border bg-[#202020] ${
                          !file
                            ? 'border-transparent text-[#7E7E7E]'
                            : 'border-[#363636] text-white'
                        }`}
                      >
                        {done
                          ? 'Ожидайте!'
                          : payProcess
                          ? 'В процессе'
                          : 'Продолжить'}{' '}
                        {payProcess && (
                          <LoaderIcon
                            className='icon-rotate'
                            width={16}
                            height={16}
                          />
                        )}
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

                <h2 className='mt-[5px] mr-[5px] ml-auto max-w-[204px] text-xl font-semibold leading-[26px] uppercase text-right'>
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
                    placeholder={`Лимит суммы ${
                      widgetSetting?.merchant?.settings?.amount?.min || 100
                    } - ${
                      widgetSetting?.merchant?.settings?.amount?.max || 29999
                    }`}
                  />
                  <span className='text-[#626262] text-sm'>UAH</span>
                </div>
                <span className='mt-[10px] text-[13px] text-[#7E7E7E]'>
                  * Введите сумму в гривнах, от{' '}
                  {widgetSetting?.merchant?.settings?.amount?.min || 100}
                </span>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-end justify-between mt-2 lg:mt-[43px] relative z-[1]'>
              <p className='lg:max-w-[227px] text-[13px] text-[#7E7E7E]'>
                * Самый быстрый путь в банк будет определен автоматически
              </p>
              <button
                disabled={
                  !amount ||
                  !sessionInit ||
                  Number(amount) <
                    (widgetSetting?.merchant?.settings?.amount?.min || 100) ||
                  Number(amount) >
                    (widgetSetting?.merchant?.settings?.amount?.max || 29999)
                }
                onClick={() => setStartPay(true)}
                className={`lg:mt-0 font-medium duration-500 mt-4 px-[47.5px] py-[9px] sm:py-[17px] w-full lg:w-fit leading-4 flex items-center justify-center border rounded-[8px] bg-[#202020] ${
                  !amount ||
                  !sessionInit ||
                  Number(amount) <
                    (widgetSetting?.merchant?.settings?.amount?.min || 100) ||
                  Number(amount) >
                    (widgetSetting?.merchant?.settings?.amount?.max || 29999)
                    ? 'border-transparent text-[#7E7E7E]'
                    : 'border-[#363636] text-white'
                }`}
              >
                Продолжить
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CustomPayment
