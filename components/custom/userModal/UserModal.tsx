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

    const [isDrax, setDrax, access_token, userInfo, result, setBalanceValue, balanceU] =
    useUnit([
      UserModel.$isDrax,
      UserModel.setIsDrax,
      RegistrModel.$access_token,
      UserModel.$userInfo,
      GameModel.$result,
      UserModel.setBalance,
      UserModel.$balance
    ])

  const [balance, setBalance] = useState<null | IAmount>(null)

  const changeToken = (isDrax:boolean) => {
    const type = isDrax ? 'Drax' : 'DraxBonus'
    setDrax(isDrax)
  }

    return (
        <Dialog open={visibility} onOpenChange={() => setVisibility(false)} >
            <DialogContent className='gap-0 !flex flex-col max-w-[560px] !h-fit bg-[#191919] p-[10px_20px]' customClose>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px] text-[#979797] text-[17px] font-bold">
                        <ModalIco />
                        UserInfo
                    </div>
                    <X onClick={() => setVisibility(false)} className='cursor-pointer w-5 h-5 aspect-square object-contain text-[#3E3E3E]' />
                </div>
                <div className="grid mt-[20px] grid-cols-2 gap-[5px]">
                    <div className="flex gap-[15px]">
                        <div className="w-full max-w-[100px] h-[100px] flex items-center justify-center rounded-[50%] bg-[#F57731]">GK</div>
                        <div className="flex flex-col justify-between items-start">
                            <span className="text-[17px] font-bold">UserName</span>
                            <div className="bg-[#121212] h-[30px] rounded-[50px] p-[10px_16px] gap-[5px] w-full max-w-[125px] items-center flex justify-center">
                                <img src={lvlImg.src} alt='lvl' className="" />
                                <span className="text-[12px] font-bold">Level: 2</span>
                            </div>
                            <span className="text-[#FFE09D] text-[10px] font-semibold uppercase">bronze league</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                        <div className="flex justify-end items-center gap-[10px]">
                            <PenIco />
                            <div className="bg-[#121212] rounded-[20px] gap-[10px] h-[40px] p-[0_20px] flex items-center justify-center">
                                <LikeIco />
                                0
                            </div>
                        </div>
                        <div className="rounded-[50px] flex gap-[5px] w-fit bg-[#121212] border border-[#212121] p-[4px]">
                            <div onClick={() => changeToken(false)} className={`flex cursor-pointer gap-[10px] ${!isDrax && 'bg-[#202020]'} p-[3px] rounded-[10px] text-[13px] font-medium`}>
                                <BonusIco />
                                BonusCoins
                            </div>
                            <div onClick={() => changeToken(true)} className={`flex cursor-pointer gap-[10px] ${isDrax && 'bg-[#202020]'} p-[3px] rounded-[10px] text-[13px] font-medium`}>
                                <DraxIco />
                                DraxCoins
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}