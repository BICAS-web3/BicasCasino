import { FC } from 'react'
import s from './styles.module.scss'
import { SupportBlock } from '@/components/custom/supportBlock/SupportBlock'
// import { SupportBlock } from "@/widgets/supportBlock/SupportBlock";
// import { Layout } from "@/widgets/Layout";

interface SupportProps {}

const Support: FC<SupportProps> = () => {
  return (
    <section className='flex items-center justify-center w-full h-full'>
      <SupportBlock />
    </section>
  )
}

export default Support
