import {FC, useEffect, useState} from 'react'
import ChestIco from '@/public/images/chestCard/modalIco.svg'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import { useUnit } from 'effector-react'
import { ChestModel } from '@/states'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabBuy, TabRedeem, TabTips } from '@/components/custom/header/components/modals/payment/tabs'
import { stringRemoveSpacing } from '@/lib/string'
import { TabChest } from './tabs/TabChest'
import { TabCard } from './tabs/TabCard'

const tabData = ['Chest', 'Card']
const tabContent = [<TabChest />, <TabCard />]

interface ChestCardModalProps {}

export const ChestCardModal:FC<ChestCardModalProps> = () => {
    const [visibility, setVisibility] = useUnit([
        ChestModel.$modalVisibility,
        ChestModel.setModalVisibility
    ])

    useEffect(() => {
        console.log(visibility)
    }, [visibility])

    const [tab, setTab] = useState(
        stringRemoveSpacing(tabData[0]).toLocaleLowerCase().toLocaleLowerCase()
      )

    return (
        <Dialog open={visibility} onOpenChange={() => setVisibility(false)} >
            <DialogContent className='gap-0 !flex flex-col max-w-[525px] h-full max-h-[700px] bg-[#181818] p-[5px_18px_8px_18px]' customClose>
                <div className='flex justify-between items-center pb-[5px] flex-row pr-2'>
                    <div className='flex items-center gap-[10px] text-[#979797]'>
                        <ChestIco className='w-5 aspect-square object-contain' />
                        <h5 className='text-[17px] tracking-[4%] leading-[23px] text-[#979797] mt-[2px] font-bold'>
                            Chest & Card
                        </h5>
                        </div>
                        <div className='flex items-center gap-4'>
                        <Button
                            className=''
                            size='icon'
                            variant='ghost'
                            onClick={() => setVisibility(false)}
                        >
                            <X className='w-5 h-5 aspect-square object-contain text-[#3E3E3E]' />
                        </Button>
                    </div>
                </div>
                <Separator className='mt-[0]' />
                    <div className="chestModalBody">
                        <Tabs defaultValue={tab} className='mt-[20px]' >
                            <TabsList className='w-full border border-[#252525]  bg-[#121212] py-[5px] px-1 rounded-full h-max gap-2'>
                                {tabData.map((tabItem, index) => (
                                    <TabsTrigger
                                        value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
                                        className='rounded-full min-h-10 text-lg data-[state=active]:bg-[#202020] hover:bg-[#181818] w-full'
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