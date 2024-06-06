import { FC, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import DCoin from '@/components/custom/header/components/icons/draxMiniIco.svg'
import { SubmitBtn } from '@/app/profile/components/submitBtn/SubmitBtn'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/css/effect-fade'
import { CampaignModal } from '../campaignModal/CampaignModal'
import { useTranslation } from 'react-i18next'

interface AffiliatesCampaignsProps {}

const accItems = [
  {
    title: 'acc_item_1',
    commission: 9999,
    list: [
      {
        title: 'Hist',
        value: 0
      },
      {
        title: 'Referalls',
        value: 0
      },
      {
        title: 'Available',
        value: 9999
      },
      {
        title: 'Transfered',
        value: 9999
      }
    ]
  },
  {
    title: 'acc_item_2',
    commission: 9999,
    list: [
      {
        title: 'Hist',
        value: 0
      },
      {
        title: 'Referalls',
        value: 0
      },
      {
        title: 'Available',
        value: 9999
      },
      {
        title: 'Transfered',
        value: 9999
      }
    ]
  },
  {
    title: 'acc_item_3',
    commission: 9999,
    list: [
      {
        title: 'Hist',
        value: 0
      },
      {
        title: 'Referalls',
        value: 0
      },
      {
        title: 'Available',
        value: 9999
      },
      {
        title: 'Transfered',
        value: 9999
      }
    ]
  }
]

export const AffiliatesCampaigns: FC<AffiliatesCampaignsProps> = () => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const createHandler = () => {
    setModalVisibility(true)
  }

  const { t } = useTranslation()

  // на будущее: избавиться от копирования элементов

  return (
    <div className='border border-[#3E3E3E] rounded-[5px] '>
      <CampaignModal visible={modalVisibility} setClose={setModalVisibility} />
      <div className='max-w-[580px]'>
        <div className='p-[20px]'>
          <div className='text-center flex items-center justify-between gap-[10px]'>
            <div className='flex flex-col gap-[5px] text-center items-center'>
              <span className='text-[#7e7e7e] text-[13px] sm:text-[17px] font-medium'>
                {t(`pages.affiliates.campaigns.Hist`)}
              </span>
              <span className='text-[#fff] text-[13px] sm:text-[17px] font-medium'>
                0
              </span>
            </div>
            <div className='flex flex-col gap-[5px] text-center items-center'>
              <span className='text-[#7e7e7e] text-[13px] sm:text-[17px] font-medium'></span>
              <span className='text-[#fff] text-[13px] sm:text-[17px] font-medium'>
                25% ({t(`pages.affiliates.campaigns.Level`)} 1)
              </span>
            </div>
            <div className='flex flex-col gap-[5px] text-center items-center'>
              <span className='text-[#7e7e7e] text-[13px] sm:text-[17px] font-medium'>
                {t(`pages.affiliates.campaigns.Referalls`)}
              </span>
              <span className='text-[#fff] text-[13px] sm:text-[17px] font-medium'>
                0
              </span>
            </div>
          </div>
          <div className='text-center mt-[30px] flex items-center justify-between gap-[10px]'>
            <div className='flex flex-col gap-[5px] text-center items-center'>
              <span className='text-[#7e7e7e] text-[13px] sm:text-[17px] font-medium'>
                {t(`pages.affiliates.campaigns.Total Commission`)}
              </span>
              <span className='text-[#fff] text-[13px] sm:text-[17px] font-medium'>
                0.000 DC
              </span>
            </div>
            <div className='flex flex-col gap-[5px] text-center items-center'>
              <span className='text-[#7e7e7e] text-[13px] sm:text-[17px] font-medium'>
                {t(`pages.affiliates.campaigns.Available`)}
              </span>
              <span className='text-[#fff] text-[13px] sm:text-[17px] font-medium'>
                0.000 DC
              </span>
            </div>
            <div className='flex flex-col gap-[5px] text-center items-center'>
              <span className='text-[#7e7e7e] text-[13px] sm:text-[17px] font-medium'>
                {t(`pages.affiliates.campaigns.Transfered`)}
              </span>
              <span className='text-[#fff] text-[13px] sm:text-[17px] font-medium'>
                0.000 DC
              </span>
            </div>
          </div>
          <Accordion
            type='single'
            collapsible
            className='w-full gap-[15px] flex flex-col mt-[30px]'
          >
            {accItems.map((item, ind) => (
              <AccordionItem key={ind} value={item.title}>
                <AccordionTrigger className='rounded-[5px] w-full h-full bg-[#212121] p-[15px_10px] text-[14px] font-medium'>
                  <div className='flex items-center justify-between w-full mr-[10px] sm:mr-[15px]'>
                    <span className='text-[14px]'>{item.title}</span>
                    <div className='flex gap-[10px] items-center'>
                      <span className='text-[14px] font-medium'>
                        {t(`pages.affiliates.campaigns.Total`)}{' '}
                        <span className='hidden sm:inline'>
                          {t(`pages.affiliates.campaigns.Commission`)}
                        </span>
                        :
                      </span>
                      <span className='flex gap-[5px] sm:gap-[10px] items-center'>
                        <DCoin className='w-[24px] h-[24px]' />
                        {item.commission}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='bg-[#1A1A1A] p-[15px_10px]'>
                  <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={20}
                    modules={[Scrollbar]}
                    scrollbar={{
                      el: '.scroll-bar',
                      draggable: true
                    }}
                    className='affiliates_swiper'
                    breakpoints={{
                      650: {
                        slidesPerView: 4,
                        spaceBetween: 0
                      }
                    }}
                  >
                    {item.list.map((item1, ind1) => (
                      <SwiperSlide
                        className={`affiliates_swiper_slide affiliates_swiper_slide${ind1}`}
                      >
                        <div className='flex flex-col gap-[10px] w-full items-center :first:pr-[10px] tmd:first:pr-[20px]'>
                          <span className='text-[11px] tmd:text-[14px] font-bold text-[#676767]'>
                            {t(`pages.affiliates.campaigns.${item1.title}`)}
                          </span>
                          <span className='text-[11px] tmd:text-[14px] font-medium'>
                            {item1.value}
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className='scroll-bar'></div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className='pt-[10px] text-[#7e7e7e] text-[14px] font-normal'>
            {t(`pages.affiliates.campaigns.text`)}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-end p-[20px] border-t-[1px] border-[#3E3E3E]'>
        <SubmitBtn
          className='max-w-full'
          title={t(`pages.affiliates.campaigns.btn`)}
          handler={createHandler}
        />
      </div>
    </div>
  )
}
