import {FC, useEffect, useState} from 'react'

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
import { stringRemoveSpacing } from '@/lib/string'
import HistoryIco from '@/public/images/chestCard/historyIco.svg'
import {TabOpened} from './tabs/TabOpened'
import { TabValid } from './tabs/TabValid'

const tabData = ['Opened Chest', 'Valid Chest', "Expired Chest"]
const tabContent = [<TabOpened />, <TabValid />, <h1>expired</h1>]

interface HistoryModalProps {}

export const HistoryModal:FC<HistoryModalProps> = () => {
    const [visibility, setVisibility, historyVisibility, setHistoryVisibility] = useUnit([
        ChestModel.$modalVisibility,
        ChestModel.setModalVisibility,
        ChestModel.$historyVisibility,
        ChestModel.setHistoryVisibility,
    ])

    const [tab, setTab] = useState(
        stringRemoveSpacing(tabData[0]).toLocaleLowerCase().toLocaleLowerCase()
      )

      useEffect(() => {
        console.log('historyVisibility', historyVisibility)
      }, [historyVisibility])

    return (
        <Dialog open={historyVisibility} onOpenChange={() => setHistoryVisibility(false)} >
            <DialogContent className='gap-0 !flex flex-col max-w-[525px] !h-fit bg-[#181818] p-[5px_18px_8px_18px]' customClose>
                <div className='flex justify-between items-center pb-[5px] flex-row pr-2'>
                    <div className='flex items-center gap-[10px] text-[#979797]'>
                        <HistoryIco className='w-5 aspect-square object-contain' />
                        <h5 className='text-[17px] tracking-[4%] leading-[23px] text-[#979797] mt-[2px] font-bold'>
                            History
                        </h5>
                        </div>
                        <div className='flex items-center gap-4'>
                        <Button
                            className=''
                            size='icon'
                            variant='ghost'
                            onClick={() => setHistoryVisibility(false)}
                        >
                            <X className='w-5 h-5 aspect-square object-contain text-[#3E3E3E]' />
                        </Button>
                    </div>
                </div>
                <Separator className='mt-[0]' />
                    <div className="chestModalBody">
                        <Tabs defaultValue={tab} className='mt-[20px]' >
                            <TabsList className='w-full bg-inherit py-[5px] p-0 h-max'>
                                {tabData.map((tabItem, index) => (
                                    <TabsTrigger
                                        value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
                                        className='min-h-10 !rounded-none text-lg text-[#7E7E7E border-b-[1px] text-[17px] font-normal border-[#252525] data-[state=active]:bg-[linear-gradient(180deg,_rgba(255,_183,_0,_0)_19.23%,_rgba(255,_183,_0,_0.15)_100%)] data-[state=active]:border-[#FFE09D] w-full'
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