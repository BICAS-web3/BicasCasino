import Image from "next/image";
import { FC } from "react";
import s from "./styles.module.scss";
import Close from "@/public/media/notification/Close.svg";
import {
  NotificationIcon_Awaiting,
  NotificationIcon_Error,
  NotificationIcon_Success,
} from "@/shared/SVGs";
import { useUnit } from "effector-react";
import * as NotificationM from "./model";

export const Notification: FC = () => {
  //   const currentAction: Action | undefined = props.action;
  // const [currentAction, setAction] = useState(Action.awaiting);
  // setAction(props.action);

  const [currentAction, setCurrentAction] = useUnit([
    NotificationM.$currentAction,
    NotificationM.setCurrentAction,
  ]);

  return (
    <>
      {currentAction === 0 && (
        <div className={s.notfication_container}>
          <div className={s.hide_animation}>
            <NotificationIcon_Awaiting />
          </div>
          <div className={s.text_await}>Awaiting transaction confirmation.</div>
          <div className={`${s.success} ${s.success_animation}`}>
            <NotificationIcon_Success />
          </div>
          <div className={`${s.text} ${s.show_animation}`}>
            Wallet confirmation successful.
          </div>
          <button className={s.btn_close}>
            <Image
              src={Close}
              alt={""}
              width={17}
              height={17}
              className={s.close_icon}
            />
          </button>
        </div>
      )}
      {currentAction === 1 && (
        <div className={s.notfication_container}>
          <div className={s.hide_animation}>
            <NotificationIcon_Awaiting />
          </div>
          <div className={s.text_await}>Awaiting transaction confirmation.</div>

          <div className={`${s.error} ${s.error_animation}`}>
            <NotificationIcon_Error />
          </div>
          <div className={`${s.text_error} ${s.show_animation}`}>
            Transaction confirmation error.
          </div>
          <button className={s.btn_close}>
            <Image
              src={Close}
              alt={""}
              width={17}
              height={17}
              className={s.close_icon}
            />
          </button>
        </div>
      )}
      {currentAction === null && (
        <div className={s.notfication_container_await}>
          <div className={`${s.awaiting} ${s.awaiting_animation} $`}>
            <NotificationIcon_Awaiting />
          </div>
          <div className={s.text_await}>Awaiting transaction confirmation.</div>
          <button className={s.btn_close}>
            <Image
              src={Close}
              alt={""}
              width={17}
              height={17}
              className={s.close_icon}
            />
          </button>
        </div>
      )}
    </>
  );
};
