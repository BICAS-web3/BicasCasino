import {FC} from 'react'


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
import { HeaderM } from '@/states'

const list = [
    {
        title: 'Profile',
        href: '/',
        icon: <ProfileIco />
    },
    {
        title: 'Settings',
        href: '/',
        icon: <SettingsIco />
    },
    {
        title: 'Notice',
        href: '/',
        icon: <NoticeIco />
    },
    {
        title: 'Vault',
        href: '/',
        icon: <VaultIco />
    },
    {
        title: 'Vip',
        href: '/',
        icon: <VipIco />
    },
    {
        title: 'Affiliate',
        href: '/',
        icon: <AffiliateIco />
    },
    {
        title: 'Transactions',
        href: '/',
        icon: <TransactionIco />
    },
    {
        title: 'Share',
        href: '/',
        icon: <ShareIco />
    },
    {
        title: 'Live Support',
        href: '/',
        icon: <SupportIco />
    },  
]

interface HeaderMenuProps {
}

export const HeaderMenu:FC<HeaderMenuProps> = ({}) => {



    const route = useRouter()

    const handleLogout = () => {
      // if (status === 'authenticated') {
      //   signOut().then(() => navigation.push('/auth/registration'))
      // }
      setVisible(false)
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      route.push('/auth/registration')
    }

    const [visible, setVisible] = useUnit([
        HeaderM.$menuVisibility,
        HeaderM.setMenuVisibility,
    ])

    return (
        <div className={`fixed ${visible ? 'opacity-1 visible' : 'invisible opacity-0'} z-[80] transition-all duration-300 w-[220px] rounded-[20px] top-[80px] right-[16px] bg-[#181818] border border-[#212121] p-[16px]`}>
            <div className='pb-[10px] border-b border-[#EAEAEA0D] gap-[10px] flex items-center'>
                <div className='w-[32px] h-[32px] rounded-[50%] text-[14px] font-bold flex items-center justify-center bg-[#F57731]'>GK</div>
                <span className="text-[#eaeaea] text-[17px] font-bold">Nickname</span>
            </div>
            <div className='flex flex-col mt-[10px] gap-[10px]'>
                {
                    list.map((item, ind) => (
                        <div className="cursor-pointer flex items-center gap-[5px]">
                            <div className='w-[24px] h-[24px] flex items-center justify-center'>{item.icon}</div>
                            <span className="text-[14px] font-bold">{item.title}</span>
                        </div>
                    ))
                }
            </div>
            <div onClick={handleLogout} className='cursor-pointer mt-[10px] pl-[5px] pt-[10px] border-t border-[#EAEAEA0D] flex items-center gap-[5px]'>
                <LogoutIco /> Log Out
            </div>
        </div>  
    )
}