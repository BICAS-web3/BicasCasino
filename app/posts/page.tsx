import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Posts page '
}
export default function Posts() {
  return (
    <>
      <section className='space-y-6 pb-8 py-8  md:py-16 lg:py-20 '>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto'>
          <h1 className='font-bold leading-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            Some page!
          </h1>
        </div>
      </section>
    </>
  )
}
