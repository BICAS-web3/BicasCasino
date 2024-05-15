import {FC, useState} from 'react'
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import { useUnit } from 'effector-react'
import { ModalsModel } from '@/states'
import VaultIco from '@/public/images/modals/vaultIco.svg'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { stringRemoveSpacing } from '@/lib/string'
import { ProgressTab } from './tabs/ProgressTab'
import { BonusTab } from './tabs/BonusTab'
import { RakebackTab } from './tabs/RakebackTab'

const tabData = ['Progress', 'Bonus', 'Rakeback']
const tabContent = [<ProgressTab />, <BonusTab />, <RakebackTab />]

interface VipModal {}

export const VipModal:FC<VipModal> = () => {

    const [visibility, setVisibility] = useUnit([
        ModalsModel.$vipModal,
        ModalsModel.setVipModal,
    ])

    const [tab, setTab] = useState(
        stringRemoveSpacing(tabData[0]).toLocaleLowerCase().toLocaleLowerCase()
      )

    return (
        <Dialog open={visibility} onOpenChange={() => setVisibility(false)} >
            <DialogContent className='gap-0 !flex flex-col max-w-[525px] !h-fit bg-[#181818] p-[5px_18px_18px_18px]' customClose>
                <div className='flex justify-between items-center pt-[12px] pb-[5px] flex-row pr-2'>
                    <div className='flex items-center gap-[10px] text-[#979797]'>
                        <VaultIco className='w-5 aspect-square object-contain' />
                        <h5 className='text-[17px] tracking-[4%] leading-[23px] text-[#979797] mt-[2px] font-bold'>
                            Vip
                        </h5>
                        </div>
                        <div className='flex items-center gap-4'>
                            <span className='underline text-[#FFE09D] text-[15px] font-medium cursor-pointer'>Transactions</span>
                            <X onClick={() => setVisibility(false)} className='w-[24px] relative left-[10px] h-[24px] cursor-pointer aspect-square object-contain text-[#3E3E3E]' />
                    </div>
                </div>
                <Separator className='mt-[0]' />
                    <div className="chestModalBody">
                        <Tabs defaultValue={tab} className='mt-[20px]' >
                            <TabsList className='w-full border border-[#252525]  bg-[#121212] py-[5px] px-1 rounded-full h-max gap-2'>
                                {tabData.map((tabItem, index) => (
                                    <TabsTrigger
                                        value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
                                        className='rounded-full !text-[15px] sm:!text-[18px] min-h-10 text-lg data-[state=active]:bg-[#202020] hover:bg-[#181818] w-full'
                                        key={`payment-modal-title--${stringRemoveSpacing(
                                        tabItem.toLocaleLowerCase()
                                        )}-${index}`}
                                        onClick={() =>
                                        setTab(stringRemoveSpacing(tabItem).toLocaleLowerCase())
                                        }
                                    >
                                        {tabItem}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {tabData.map((tabItem, index) => (
                                <TabsContent
                                    key={`payment-modal-content--${stringRemoveSpacing(
                                        tabItem.toLocaleLowerCase()
                                    )}-${index}`}
                                    value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
                                    className={`pt-1 h-full ${tabItem === 'Chest' && '!pt-5'}`}
                                    >
                                    {tabContent[index]}
                                </TabsContent>
                            ))}
                    </Tabs>
                    </div>
            </DialogContent>
        </Dialog>
    )
}