import { ReactNode } from 'react';
import s from './styles.module.scss';

import { SideBar } from '@/widgets/SideBar';
import { Header } from '../header';
import { LayoutModel } from '.';
import { useUnit } from 'effector-react';


interface LayoutProps {
    children?: ReactNode[]
}
export const Layout = ({ children, ...props }: LayoutProps) => {
    const [BlurActive
    ] = useUnit([
        LayoutModel.$BlurActive
    ]);
    return (
        <div className={s.page_container}>
            <Header />
            <div className={s.side_bar_wrapper}>
                <SideBar />
            </div>
            <div className={s.blur_overlay}>

            </div>
            <main className={`${s.main_area} ${BlurActive ? s.blur_effect : ''}`}>
                {children}
            </main>
        </div>
    )
}