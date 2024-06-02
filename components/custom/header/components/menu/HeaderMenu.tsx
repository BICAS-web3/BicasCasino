import { FC, useEffect } from 'react'

import ProfileIco from '@/public/icons/profileIco.svg'
import VipIco from '@/public/icons/vipIco.svg'
import LogoutIco from '@/public/icons/logoutIco.svg'
import SettingsIco from '@/public/icons/settingsIco.svg'
import NoticeIco from '@/public/icons/noticeIco.svg'
import VaultIco from '@/public/icons/vaultIco.svg'
import AffiliateIco from '@/public/icons/affiliateIco.svg'
import TransactionIco from '@/public/icons/transactionIco.svg'
import ShareIco from '@/public/icons/shareIco.svg'
import SupportIco from '@/public/icons/supportIco.svg'

import { useRouter } from 'next/navigation'
import { useUnit } from 'effector-react'
import {
  HeaderM,
  ModalsModel,
  PaymentModel,
  RegistrModel,
  UserModel,
  WagerModel
} from '@/states'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useSocket } from '@/components/providers/socket.provider'
import { removeCookie } from '@/lib/cookies'

const list = [
  {
    title: 'Profile',
    href: '',
    icon: <ProfileIco />
  },
  {
    title: 'Settings',
    href: '/profile',
    icon: <SettingsIco />
  },
  {
    title: 'Notice',
    href: '/404',
    icon: <NoticeIco />
  },
  {
    title: 'Vault',
    href: '/404',
    icon: <VaultIco />
  },
  {
    title: 'Vip',
    href: '/404',
    icon: <VipIco />
  },
  {
    title: 'Affiliate',
    href: 'affiliates',
    icon: <AffiliateIco />
  },
  {
    title: 'Transactions',
    href: '/404',
    icon: <TransactionIco />
  },
  {
    title: 'Share',
    href: '/404',
    icon: <ShareIco />
  },
  {
    title: 'Live Support',
    href: '/404',
    icon: <SupportIco />
  }
]

interface HeaderMenuProps {}

export const HeaderMenu: FC<HeaderMenuProps> = ({}) => {
  const route = useRouter()
  const socket = useSocket()
  const [
    visible,
    setVisible,
    setShowTransaction,
    setUserModalVisibility,
    setVipModal,
    setVaultModal,
    setCryptoValue,
    setSocketAuth,
    setAccessToken,
    setRefreshToken,
    setUserInfo,
    setSocketReset,
    setSeed,
    setErrorSeed,
    setSocketLogged,
    setConnect
  ] = useUnit([
    HeaderM.$menuVisibility,
    HeaderM.setMenuVisibility,
    PaymentModel.setShowTransaction,
    HeaderM.setUserModalVisibility,
    ModalsModel.setVipModal,
    ModalsModel.setVaultModal,
    WagerModel.setCryptoValue,
    UserModel.setSocketAuth,
    RegistrModel.setAccessToken,
    RegistrModel.setRefreshToken,
    UserModel.setUserInfo,
    UserModel.setSocketReset,
    UserModel.setSeed,
    UserModel.setErrorSeed,
    UserModel.setSocketLogged,
    UserModel.setConnect
  ])

  const handleLogout = async () => {
    socket?.close()
    setVisible(false)
    await removeCookie({ key: 'access_token' })
    await removeCookie({ key: 'refresh_token' })
    setSocketAuth(false)
    setCryptoValue(1)
    setAccessToken('')
    setRefreshToken('')
    setUserInfo(null)
    setSeed(null)
    setErrorSeed(false)
    setSocketLogged(false)
    setConnect(false)
    // setSocketReset()
    route.push('/auth/registration')
  }

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      if (e.target.dataset.close === undefined) {
        setVisible(false)
      }
    })
  }, [])

  const [userInfo] = useUnit([UserModel.$userInfo])
  const { t } = useTranslation()
  return (
    <div
      data-close
      className={`fixed ${
        visible ? 'opacity-1 visible' : 'invisible opacity-0'
      } z-[80] overflow-hidden transition-all duration-300 w-[220px] rounded-[20px] top-[70px] right-[11px] bg-[#181818] border border-[#212121]`}
    >
      <div
        data-close
        className='pb-[10px] p-[16px_16px_0_16px] border-b border-[#EAEAEA0D] gap-[10px] flex items-center'
      >
        <div
          data-close
          className='min-w-[32px] h-[32px] rounded-[50%] text-[14px] font-bold flex items-center justify-center bg-[#F57731]'
        >
          GK
        </div>
        <span
          data-close
          className='text-[#eaeaea] text-[17px] font-bold overflow-hidden w-full text-ellipsis'
        >
          {userInfo?.username}
        </span>
      </div>
      <div
        data-close
        className='absolute top-[50%] translate-y-[-50%] right-[-100px] rounded-[50%] blur-[50px] w-[200px] h-[200px] bg-[#F3AC6B1A] mix-blend-hard-light '
      ></div>
      <div className='flex flex-col mt-[10px]'>
        {list.map((item, ind) => {
          if (item.href === '/404') {
            return (
              <div
                data-close
                className='cursor-pointer p-[16px] h-[40px] hover:bg-[#D9D9D926] flex items-center gap-[5px] relative'
              >
                <span className='absolute right-4 top-1 text-[12px] text-[#979797] rotate-2'>
                  {t(`modals.user.soon`)}
                </span>
                <div
                  data-close
                  className='w-[24px] h-[24px] flex items-center justify-center'
                >
                  {item.icon}
                </div>
                <span data-close className='text-[14px] font-bold'>
                  {t(`modals.user.${item.title}`)}
                </span>
              </div>
            )
          } else if (
            item.title === 'Transactions' ||
            item.title === 'Profile' ||
            item.title === 'Vip' ||
            item.title === 'Vault'
          ) {
            return (
              <div
                onClick={() => {
                  if (item.title === 'Transactions') {
                    setShowTransaction(true)
                  } else if (item.title === 'Profile') {
                    setUserModalVisibility(true)
                  } else if (item.title === 'Vip') {
                    setVipModal(true)
                  } else if (item.title === 'Vault') {
                    setVaultModal(true)
                  }
                }}
                data-close
                className='cursor-pointer p-[16px] h-[40px] hover:bg-[#D9D9D926] flex items-center gap-[5px]'
              >
                <div
                  data-close
                  className='w-[24px] h-[24px] flex items-center justify-center'
                >
                  {item.icon}
                </div>
                <span data-close className='text-[14px] font-bold'>
                  {t(`modals.user.${item.title}`)}
                </span>
              </div>
            )
          } else {
            return (
              <Link
                href={item.href}
                data-close
                className='cursor-pointer p-[16px] h-[40px] hover:bg-[#D9D9D926] flex items-center gap-[5px]'
              >
                <div
                  data-close
                  className='w-[24px] h-[24px] flex items-center justify-center'
                >
                  {item.icon}
                </div>
                <span data-close className='text-[14px] font-bold'>
                  {t(`modals.user.${item.title}`)}
                </span>
              </Link>
            )
          }
        })}
      </div>
      <div
        onClick={handleLogout}
        data-close
        className='p-[10px_16px_16px_20px] cursor-pointer mt-[10px] border-t border-[#EAEAEA0D] flex items-center gap-[5px]'
      >
        <LogoutIco /> {t(`modals.user.out`)}
      </div>
    </div>
  )
}
