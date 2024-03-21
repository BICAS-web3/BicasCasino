import Header from '@/components/custom/header'
import Sidebar from '@/components/custom/Sidebar'
import Footer from '@/components/custom/footer'
import { ThemeProvider } from './theme.provider'

type Props = {
  children: React.ReactNode
}

const MainProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <main>
        <Header />
        <div className='flex flex-nowrap'>
          <Sidebar />
          <div className='flex flex-col'>
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}

export default MainProvider
