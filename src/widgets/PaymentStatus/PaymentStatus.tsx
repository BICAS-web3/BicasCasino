import { FC, useState } from "react";
import s from "./styles.module.scss";
import closeIco from "@/public/media/payment/closeIco.svg";
import linkIco from "@/public/media/payment/linkIco.svg";
import allowArr from "@/public/media/payment/allowArr.svg";
import copyIco from "@/public/media/payment/copyIco.svg";
import clsx from "clsx";
import { WaitIco } from "@/shared/SVGs/WaitIco";

const tableInfo = [
  {
    title: "Invoice amount",
    content: "none",
  },
  {
    title: "Exchange rate",
    content: "none",
  },
  {
    title: "Payment amount",
    content: "none",
  },
  {
    title: "Date / Time",
    content: "none",
  },
];

interface PaymentStatusProps {}

export const PaymentStatus: FC<PaymentStatusProps> = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(tableInfo);

  return (
    <div className={s.payment_status_block}>
      <img src={closeIco.src} className={s.close_btn} alt="close-ico" />
      <div className={s.payment_status_header}>
        <span className={clsx(s.payment_status_title, isSuccess && s.success)}>
          {isSuccess ? "Success!" : "Payment detected"}
        </span>
        <div className={s.scan_link}>
          tronscan.io
          <img src={linkIco.src} alt="link-ico" className={s.link_ico} />
        </div>
      </div>
      <div className={s.payment_status_id_wrap}>
        <span className={s.payment_status_id_title}>Payment ID:</span>
        <div className={s.payment_status_id}>
          payment id <img src={copyIco.src} alt="copy-ico" />
        </div>
      </div>
      <div className={s.payment_info}>
        {paymentInfo.map((item, ind) => (
          <div className={clsx(s.payment_info_item, s.success_price)} key={ind}>
            <span className={s.payment_info_title}>{item.title}</span>
            <span className={s.payment_info_value}>{item.content}</span>
          </div>
        ))}
      </div>
      <div className={s.payment_status_footer}>
        <div
          className={clsx(
            s.pending_confirm_block,
            isSuccess && s.succes_pending
          )}
        >
          <div className={s.pending_confirmation_title}>
            Pending confirmation
          </div>
          <div className={s.pending_confirmation_ico_wrap}>
            {isSuccess ? <img src={allowArr.src} alt="" /> : <WaitIco />}
          </div>
        </div>
        <div className={s.payment_status_text}>
          The payment will be considered successful when transaction is
          confirmed on the network
        </div>
      </div>
    </div>
  );
};
