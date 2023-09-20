import Image from 'next/image';
import { FC } from 'react';
import s from './styles.module.scss';
import Close from '@/public/media/notification/Close.svg';
import { NotificationIcon_Awaiting, NotificationIcon_Error, NotificationIcon_Success } from '@/shared/SVGs';

export enum Action{
    success ,
    error,
}

// export interface NotficationProps{ action?: Action }
// export const Notification: FC<NotficationProps>  = props => {
//     const currentAction:Action | undefined = props.action;
//     // const [currentAction, setAction] = useState(Action.awaiting);
//     // setAction(props.action);
//     return( 
//     <div className={s.notfication_container}>
//         {currentAction === 0 && <>

//             <div className={s.awaiting}>
//                 <NotificationIcon_Awaiting />
//             </div>
//             <div className={s.text_await}>
//                 Awaiting transaction confirmation.
//             </div>
        
//             <div className={s.success}>
//                 <NotificationIcon_Success />
//             </div>
//             <div className={s.text}>
//                 Wallet confirmation successful.
//             </div>
//         </>}
//         {currentAction === 1 && <>
//             <div className={s.awaiting}>
//                 <NotificationIcon_Awaiting />
//             </div>
//             <div className={s.text_await}>
//                 Awaiting transaction confirmation.
//             </div>
//             <div className={s.error}>
//                 <NotificationIcon_Error />
//             </div>
//             <div className={s.text}>
//                 Transaction confirmation error.
//             </div>
//         </>}
//         {currentAction === undefined && <>
//             <div className={`${s.awaiting}  ${s.awaiting_animate}`}>
//                 <NotificationIcon_Awaiting />
//             </div>
//             <div className={`${s.text_await}  ${s.text_animate}`}>
//                 Awaiting transaction confirmation.
//             </div>
//         </>}
//         <button className={s.btn_close}>
//             <Image
//                 src={Close}
//                 alt={''}
//                 width={17}
//                 height={17}
//                 className={s.close_icon}
//             />
//         </button>
//     </div>
//     );  
// }

export interface NotficationProps{ action?: Action }
export const Notification: FC<NotficationProps>  = props => {
    const currentAction:Action | undefined = props.action;
    // const [currentAction, setAction] = useState(Action.awaiting);
    // setAction(props.action);
    return( 
    <div className={s.notfication_container}>
        {currentAction === 0 && <>
            <div className={s.awaiting}>
                <NotificationIcon_Awaiting />
            </div>
            <div className={s.text_await}>
                Awaiting transaction confirmation.
            </div>
            <div className={`${s.success} ${s.success_animate}`}>
                <NotificationIcon_Success />
            </div>
            <div className={s.text}>
                Wallet confirmation successful.
            </div>
            
            <div className={s.error}>
                <NotificationIcon_Error />
            </div>
            <div className={s.text_error}>
                Transaction confirmation error.
            </div>     
        </>}
        {currentAction === 1 && <>
            <div className={s.awaiting}>
                <NotificationIcon_Awaiting />
            </div>
            <div className={s.text_await}>
                Awaiting transaction confirmation.
            </div>
            <div className={s.success}>
                <NotificationIcon_Success />
            </div>
            <div className={s.text}>
                Wallet confirmation successful.
            </div>
            
            <div className={`${s.error} ${s.error_animate}`}>
                <NotificationIcon_Error />
            </div>
            <div className={s.text_error}>
                Transaction confirmation error.
            </div>      
        </>}
        {currentAction === undefined && <>
            <div className={`${s.awaiting} ${s.awaiting_animate}`}>
                <NotificationIcon_Awaiting />
            </div>
            <div className={s.text_await}>
                Awaiting transaction confirmation.
            </div>
            <div className={s.success}>
                <NotificationIcon_Success />
            </div>
            <div className={s.text}>
                Wallet confirmation successful.
            </div>
            
            <div className={s.error}>
                <NotificationIcon_Error />
            </div>
            <div className={s.text_error}>
                Transaction confirmation error.
            </div>  
        </>}
        <button className={s.btn_close}>
            <Image
                src={Close}
                alt={''}
                width={17}
                height={17}
                className={s.close_icon}
            />
        </button>
    </div>
    );  
}