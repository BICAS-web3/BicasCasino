import { ReactNode } from 'react';
import s from './styles.module.scss';

import { SideBar } from '@/widgets/SideBar';
import { Header } from '../header';


interface LayoutProps {
    children?: ReactNode[]
}
export const Layout = ({ children, ...props }: LayoutProps) => {
    return (
        <div className={s.page_container}>
            <Header />
            <div className={s.side_bar_wrapper}>
                <SideBar />
            </div>
            <main className={s.main_area}>
                {/* <div className={s.side_bar_wrapper}>
                    <SideBar />
                </div> */}
                {children}
            </main>
        </div>
    )
}