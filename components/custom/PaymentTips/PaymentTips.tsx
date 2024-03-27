import { FC, useEffect, useState } from 'react'
import dcCoinIco from '@/public/payment/dcCoinIco.webp'
import bcCoinIco from '@/public/payment/bcCoinIco.webp'
import { PaymentDropdown } from '../PaymentDropdown/PaymentDropdown'

// import * as api from "@/shared/api";
// import * as LayoutModel from "@/widgets/Layout/model";
// import * as BalanceSwitcherM from "@/widgets/BalanceSwitcher/model";
// import * as BetsModel from "@/widgets/LiveBets/model";
// import * as RegistrModel from "@/widgets/Registration/model";
import { useUnit } from 'effector-react'

interface IAmount {
  type: 'Amounts'
  amounts: {
    name: 'Drax' | 'DraxBonus'
    amount: string
  }[]
}

const tipsList = [
  {
    ico: dcCoinIco,
    title: '1.77 dc'
  },
  {
    ico: bcCoinIco,
    title: '170.000 bc'
  }
]

interface PaymentTipsProps {}

export const PaymentTips: FC<PaymentTipsProps> = () => {
  const [activeCoin, setActiveCoin] = useState(tipsList[0])
  // const [balance, setBalance] = useState<null | IAmount>(null);

  // const [balance] = useUnit([
  //   // RegistrModel.$access_token,
  //   // LayoutModel.$userInfo,
  //   // BetsModel.$result,
  //   BalanceSwitcherM.$balanceTotal,
  // ]);

  // useEffect(() => {
  //   console.log("user info: ", userInfo);
  //   if (access_token && userInfo) {
  //     (async () => {
  //       const data = await api.getUserAmounts({
  //         bareer: access_token,
  //         userId: userInfo?.id,
  //       });

  //       console.log("amount: ", data.body);
  //       if (data.status === "OK") {
  //         setBalance((data as any).body);
  //       }
  //     })();
  //   }
  // }, [access_token, userInfo?.id, result]);

  const [tList, setTList] = useState([
    {
      ico: dcCoinIco,
      title: '1.77 dc'
    },
    {
      ico: bcCoinIco,
      title: '170.000 bc'
    }
  ])

  // useEffect(() => {
  //   console.log("BALANCE", balance);
  // }, [balance]);

  // const changeToBalance = () => {
  //   if (balance) {
  //     setTList([
  //       {
  //         ico: dcCoinIco,
  //         title: balance.amounts[0].amount,
  //       },
  //       {
  //         ico: bcCoinIco,
  //         title: balance.amounts[1].amount,
  //       },
  //     ]);
  //   }
  // };

  return (
    <div
      className='
        flex flex-col sm:px-[30px] flex-1 gap-[20px] px-[16px] pb-[30px] overflow-auto
        scroll -webkit-scrollbar:w-[4px] -webkit-scrollbar:ml-[4px] -webkit-scrollbar:rounded-[3px] 
        
      '
    >
      <div
        className='
          max-w-full h-[40px] my-[0] sm:mx-auto sm:max-w-[280px] sm:w-full
        '
      >
        <PaymentDropdown list={tList} setActive={setActiveCoin} />
      </div>
      <div
        className='
          flex flex-col w-full gap-[5px] 
        '
      >
        <span
          className='text-inp-col text-[14px] sm:text-[16px]
          font-extrabold leading-[22px] tracking-[0.04em] text-left 
          '
        >
          Username
        </span>
        <input
          type='text'
          className='
            h-[40px] box-border text-[14px] sm:text-[16px] font-normal
            rounded-[5px] bg-[linear-gradient(0deg,_#121212,_#121212),_linear-gradient(0deg,_#252525,_#252525)]
            px-[20px] flex items-start justify-between text-text-w-def leading-[22px] tracking-[0.04em]
            text-left outline-none
          '
        />
      </div>
      <div className='flex flex-col w-full gap-[5px] relative'>
        <span
          className='
          text-inp-col text-[14px] sm:text-[16px]
          font-extrabold leading-[22px] tracking-[0.04em] text-left 
          '
        >
          Tips amount
        </span>
        <input
          type='text'
          className='
          h-[40px] box-border text-[14px] sm:text-[16px] font-normal
          rounded-[5px] bg-[linear-gradient(0deg,_#121212,_#121212),_linear-gradient(0deg,_#252525,_#252525)]
          px-[20px] flex items-start justify-between text-text-w-def leading-[22px] tracking-[0.04em]
          text-left outline-none
        '
        />
        <img
          src={activeCoin.ico.src}
          className='w-[24px] h-[24px] absolute right-[20px] bottom-[8px]'
          alt='tips-coin'
        />
      </div>
      <div className='flex sm:flex-col gap-[15px] flex-1 flex-col-reverse justify-between'>
        <button
          className='
            duration-400 transition-all group w-full min-h-[40px] sm:min-h-[45px] flex justify-center items-center
            rounded-[8px] border border-[#ffe09d] bg-[linear-gradient(0deg,_#252019,_#252019),_linear-gradient(0deg,_#ffe09d,_#ffe09d)]\
            text-[#ffe09d] text-[14px] sm:text-[16px] leading-[16px] tracking-[0.04em] text-center relative overflow-hidden

          '
        >
          Send {activeCoin.title}
          <div
            className='
            transition-all duration-400 invisible opacity-0 absolute bottom-[-40px]
            left-[50%] translate-x-[-50%] bg-[#ffb800] mix-blend-hard-light blur-[32px]
            h-[50px] w-[60px] group-hover:opacity-100 group-hover:visible
          '
          ></div>
        </button>
        <span
          className='text-inp-col text-[14px] sm:text-[18px] font-normal leading-[16px] sm:leading-[25px] tracking-[0.04em]
            text-center 
          '
        >
          Your remaining balance must be greater or equal to 20 DC
        </span>
      </div>
    </div>
  )
}
