import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import { GameModel, HeaderM, RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import {FC, useState} from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ModalIco from '@/public/images/userModal/modalIco.svg'

import lvlImg from "@/public/images/userModal/lvl.png"
import LikeIco from '@/public/images/userModal/likeIco.svg'
import PenIco from '@/public/images/userModal/penIco.svg'
import BonusIco from '@/public/images/userModal/bonusIco.svg'
import DraxIco from '@/public/images/userModal/draxIco.svg'
import { IAmount } from "../header/components/balance.switch"

interface UserModalProps {}

export const UserModal:FC<UserModalProps> = () => {

    const [visibility, setVisibility] = useUnit([
        HeaderM.$userModalVisibility,
        HeaderM.setUserModalVisibility
    ])

    const [isDrax, setDrax, info] =
    useUnit([
      UserModel.$isDrax,
      UserModel.setIsDrax,
      UserModel.$userInfo
    ])

  const changeToken = (isDrax:boolean) => {
    const type = isDrax ? 'Drax' : 'DraxBonus'
    setDrax(isDrax)
  }

    return (
        <Dialog open={visibility} onOpenChange={() => setVisibility(false)} >
            <DialogContent className='gap-0 !flex flex-col max-w-[560px] !h-fit bg-[#191919] p-[10px_20px_30px_20px]' customClose>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px] text-[#979797] text-[17px] font-bold">
                        <ModalIco />
                        UserInfo
                    </div>
                    <X onClick={() => setVisibility(false)} className='cursor-pointer w-5 h-5 aspect-square object-contain text-[#3E3E3E]' />
                </div>
                <div className="grid mt-[20px] grid-cols-1 sm:grid-cols-2 gap-[5px]">
                    <div className="flex gap-[15px]">
                        <div className="w-full min-w-[70px] sm:min-w-[100px] max-w-[70px] sm:max-w-[100px] h-[70px] sm:h-[100px] flex items-center justify-center rounded-[50%] bg-[#F57731]">GK</div>
                        <div className="flex flex-col justify-start gap-[5px] sm:gap-0 sm:justify-between items-start">
                            <div className="sm:h-full flex flex-row items-center sm:items-start sm:flex-col justify-between gap-[5px] mb-0 sm:mb-[20px]">
                                <span className="text-[14px] sm:text-[17px] font-bold">UserName</span>
                                <div className="bg-[#121212] min-w-[80px] h-[30px] rounded-[50px] p-[6px_10px_6px_8px] sm:p-[10px_16px] gap-[5px] w-full max-w-[125px] items-center flex justify-center">
                                    <img src={lvlImg.src} alt='lvl' className="min-w-[20px] sm:min-w-[30px] h-[20px] sm:h-[30px]" />
                                    <span className="text-[10px] sm:text-[12px] font-bold">Level: 2</span>
                                </div>
                            </div>
                            <div className="flex sm:hidden justify-end items-center gap-[10px]">
                                <PenIco />
                                <div className="bg-[#121212] text-[12px] rounded-[20px] gap-[10px] h-[20px] p-[0_10px] flex items-center justify-center">
                                    <LikeIco className="w-[15px] h-[15px]" />
                                    0
                                </div>
                            </div>
                            <span className="text-[#FFE09D] hidden sm:block text-[10px] font-semibold uppercase">bronze league</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end justify-between">
                        <div className="hidden sm:flex justify-end items-center gap-[10px]">
                            <PenIco />
                            <div className="bg-[#121212] rounded-[20px] gap-[10px] h-[40px] p-[0_20px] flex items-center justify-center">
                                <LikeIco className="w-[22px] h-[22px]" />
                                0
                            </div>
                        </div>
                        <div className="rounded-[50px] flex gap-[5px] w-fit bg-[#121212] border border-[#212121] p-[4px]">
                            <div onClick={() => changeToken(false)} className={`flex cursor-pointer gap-[10px] ${!isDrax && 'bg-[#202020]'} p-[3px_8px_3px_3px] rounded-[16px] text-[13px] font-medium`}>
                                <BonusIco />
                                BonusCoins
                            </div>
                            <div onClick={() => changeToken(true)} className={`flex cursor-pointer gap-[10px] ${isDrax && 'bg-[#202020]'} p-[3px_8px_3px_3px] rounded-[16px] text-[13px] font-medium`}>
                                <DraxIco />
                                DraxCoins
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid mt-[20px] grid-cols-2 gap-[10px]">
                    <div className="bg-[#121212] flex-col h-[60px] flex justify-center items-center p-[0_10px]">
                        <span className="text-[#fff] text-[15px] font-bold">3</span>
                        <span className="text-[#7e7e7e] text-[15px] font-medium uppercase">wins</span>
                    </div>
                    <div className="bg-[#121212] flex-col h-[60px] flex justify-center items-center p-[0_10px]">
                        <span className="text-[#fff] text-[15px] font-bold">3</span>
                        <span className="text-[#7e7e7e] text-[15px] font-medium uppercase">wins</span>
                    </div>
                    <div className="bg-[#121212] flex-col h-[60px] flex justify-center items-center p-[0_10px]">
                        <span className="text-[#fff] text-[15px] font-bold">3</span>
                        <span className="text-[#7e7e7e] text-[15px] font-medium uppercase">wins</span>
                    </div>
                    <div className="bg-[#121212] flex-col h-[60px] flex justify-center items-center p-[0_10px]">
                        <span className="text-[#fff] text-[15px] font-bold">3</span>
                        <span className="text-[#7e7e7e] text-[15px] font-medium uppercase">wins</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}