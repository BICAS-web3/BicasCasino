import {FC, useEffect} from 'react'


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
      setVisible(false)
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      route.push('/auth/registration')
    }

    const [visible, setVisible] = useUnit([
        HeaderM.$menuVisibility,
        HeaderM.setMenuVisibility,
    ])

    useEffect(() => {
        window.addEventListener('click', (e:any) => {
            if(e.target.dataset.close === undefined) {
                setVisible(false)
            }
        })
    }, [])

    return (
        <div data-close className={`fixed ${visible ? 'opacity-1 visible' : 'invisible opacity-0'} z-[80] overflow-hidden transition-all duration-300 w-[220px] rounded-[20px] top-[70px] right-[11px] bg-[#181818] border border-[#212121]`}>
            <div data-close className='pb-[10px] p-[16px_16px_0_16px] border-b border-[#EAEAEA0D] gap-[10px] flex items-center'>
                <div data-close className='w-[32px] h-[32px] rounded-[50%] text-[14px] font-bold flex items-center justify-center bg-[#F57731]'>GK</div>
                <span data-close className="text-[#eaeaea] text-[17px] font-bold">Nickname</span>
            </div>
            <div data-close className='absolute top-[50%] translate-y-[-50%] right-[-100px] rounded-[50%] blur-[50px] w-[200px] h-[200px] bg-[#F3AC6B1A] mix-blend-hard-light '></div>
            <div className='flex flex-col mt-[10px]'>
                {
                    list.map((item, ind) => (
                        <div data-close className="cursor-pointer p-[16px] h-[40px] hover:bg-[#D9D9D926] flex items-center gap-[5px]">
                            <div data-close className='w-[24px] h-[24px] flex items-center justify-center'>{item.icon}</div>
                            <span data-close className="text-[14px] font-bold">{item.title}</span>
                        </div>
                    ))
                }
            </div>
            <div onClick={handleLogout} data-close className='p-[10px_16px_16px_20px] cursor-pointer mt-[10px] border-t border-[#EAEAEA0D] flex items-center gap-[5px]'>
                <LogoutIco /> Log Out
            </div>
        </div>  
    )
}