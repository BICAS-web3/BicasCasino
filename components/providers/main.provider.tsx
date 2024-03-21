import Header from '@/components/custom/Header'
import { ThemeProvider } from './theme.provider'

type Props = {
  children: React.ReactNode
}

const MainProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <main className='min-h-screen'>
        <Header />
        <div className='max-w-7xl mx-auto p-4'>{children}</div>
      </main>
    </ThemeProvider>
  )
}

export default MainProvider
