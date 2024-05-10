import {FC} from 'react'
import item1 from "@/public/images/mell/item1.png"
import item2 from "@/public/images/mell/item2.png"
import item3 from "@/public/images/mell/item3.png"
import item4 from "@/public/images/mell/item4.png"
import item5 from "@/public/images/mell/item5.png"
import item6 from "@/public/images/mell/item6.png"
import item7 from "@/public/images/mell/item7.png"
import item8 from "@/public/images/mell/item8.png"
import item9 from "@/public/images/mell/item9.png"

const items = [
    {
        img: item1,
        list: [
            '12 - 30 $100,00',
            '10 - 11 $50,00',
            '8 - 9 $20,00',
        ]
    },
    {
        img: item2,
        list: [
            '12 - 30 $50,00',
            '10 - 11 $20,00',
            '8 - 9 $5,00',
        ]
    },
    {
        img: item3,
        list: [
            '12 - 30 $30,00',
            '10 - 11 $10,00',
            '8 - 9 $4,00',
        ]
    },
    {
        img: item4,
        list: [
            '12 - 30 $24,00',
            '10 - 11 $4,00',
            '8 - 9 $3,00',
        ]
    },
    {
        img: item5,
        list: [
            '12 - 30 $20,00',
            '10 - 11 $3,00',
            '8 - 9 $2,00',
        ]
    },
    {
        img: item6,
        list: [
            '12 - 30 $16,00',
            '10 - 11 $2,40',
            '8 - 9 $1,60',
        ]
    },
    {
        img: item7,
        list: [
            '12 - 30 $10,00',
            '10 - 11 $2,00',
            '8 - 9 $1,00',
        ]
    },
    {
        img: item8,
        list: [
            '12 - 30 $8,00',
            '10 - 11 $1,80',
            '8 - 9 $0,80',
        ]
    },
    {
        img: item9,
        list: [
            '12 - 30 $4,00',
            '10 - 11 $1,50',
            '8 - 9 $0,50',
        ]
    },
]

interface RulesBlockProps {}

export const RulesBlock:FC<RulesBlockProps> = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-center text-[12px] sm:text-[26px] font-bold block mb-[8px] uppercase w-full'>правила игры</h1>
            <p className="text-[10px] sm:text-[16px] font-bold max-w-[800px] text-center">
                Символы оплачиваются в любом месте экрана. Общее количество одинаковых символов на экране в конце спина определяет сумму выигрыша.
            </p>
            <div className='grid mt-[20px] sm:hidden grid-cols-3 gap-[30px]'>
                {
                    items.map((item, ind) => (
                        <div className="flex flex-col items-center" key={ind} >
                            <img src={item.img.src} className='max-w-[50px] max-h-[50px]' alt='img' />
                            <div className='flex flex-col items-end mt-[10px]'>
                                {
                                    item.list.map((item2, ind2) => (
                                        <span key={ind2} className='text-[10px] text-end font-semibold'>{item2}</span>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='hidden sm:flex gap-[5vw] mt-[20px]'>
                {
                    items.slice(0,4).map((item, ind) => (
                        <div className="" key={ind} >
                            <img src={item.img.src} className='max-w-[100px] max-h-[100px]' alt='img' />
                            <div className='flex flex-col items-end mt-[10px]'>
                                {
                                    item.list.map((item2, ind2) => (
                                        <span key={ind2} className='text-[17px] font-semibold'>{item2}</span>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='hidden sm:flex gap-[5vw]'>
                {
                    items.slice(4,items.length).map((item, ind) => (
                        <div className="" key={ind} >
                            <img src={item.img.src} className='max-w-[100px] max-h-[100px]' alt='img' />
                            <div className='flex flex-col items-end mt-[10px]'>
                                {
                                    item.list.map((item2, ind2) => (
                                        <span key={ind2} className='text-[17px] font-semibold'>{item2}</span>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex items-center justify-center gap-[16px] mt-[20px]'>
                <div className='flex flex-col items-end justify-center'>
                    <span className='text-[10px] sm:text-[17px] font-semibold'>6 - $200,00</span>
                    <span className='text-[10px] sm:text-[17px] font-semibold'>5 - $10,00</span>
                    <span className='text-[10px] sm:text-[17px] font-semibold'>4 - $6,00</span>
                </div>
                <img src='/images/mell/melGif.gif' className='w-[70px] h-[70px] sm:w-[125px] sm:h-[125px]' />
                <div className='flex flex-col items-start justify-center max-w-[380px]'>
                    <span className='text-[12px] sm:text-[19px] font-semibold'>Этот символ - MELLSPIN</span>
                    <span className='text-[12px] sm:text-[19px] font-semibold'>Символ MELLSPIN присутствует на всех барабанах.</span>
                    <span className='text-[12px] sm:text-[19px] font-semibold'>MELLSPIN платит в любой позиции.</span>
                </div>
            </div>
        </div>
    )
}