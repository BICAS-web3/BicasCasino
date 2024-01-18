import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import applesBg from "@/public/media/apples/applesMainBg.png";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import appleBg from "@/public/media/apples/appleItemBg.svg";
import cfBg from "@/public/media/apples/cfBg.svg";
import { AppleIco } from "@/shared/SVGs/AppleIco";
import backIco from "@/public/media/apples/backIco.svg";
import { ApplesWinBlock } from "../ApplesWin/ApplesWinBlock";

interface ApplesGameProps {}

export const ApplesGame: FC<ApplesGameProps> = () => {
  const [applesArr, setApplesArr] = useState(Array(27).fill({}));
  const [chunkedApplesArr, setChunkedApplesArr] = useState<any>([]);

  useEffect(() => {
    const updateChunkedArray = () => {
      const arr = [];
      const chunkSize = 3;

      for (let i = 0; i < applesArr.length; i += chunkSize) {
        const chunk = applesArr.slice(i, i + chunkSize);
        let cf = 0;
        switch (i) {
          case 0:
            cf = 64;
            break;
          case 3:
            cf = 32;
            break;
          case 6:
            cf = 16;
            break;
          case 9:
            cf = 8;
            break;
          case 12:
            cf = 4;
            break;
          case 15:
            cf = 2;
            break;
          case 18:
            cf = 1.7;
            break;
          case 21:
            cf = 1.5;
            break;
          case 24:
            cf = 1.3;
            break;
          default:
            cf = 0;
            break;
        }

        arr.push({ apples: chunk, cf: cf });
      }

      setChunkedApplesArr(arr);
    };

    updateChunkedArray();
  }, [applesArr]);

  console.log(chunkedApplesArr);

  return (
    <>
      <div className={s.apples_game_wrap}>
        <WagerLowerBtnsBlock game="apples" text={"apples"} />
        <div className={s.apples_table_background}>
          <img
            src={applesBg.src}
            className={s.apples_table_background}
            alt="apples-static-bg"
          />
        </div>
        <div className={s.apples_table_block}>
          <div className={s.apples_table_wrap}>
            <ApplesWinBlock />
            <div className={s.apples_table}>
              {chunkedApplesArr &&
                chunkedApplesArr.map((item: any, ind: any) => (
                  <div className={s.apples_row} key={ind}>
                    <div className={s.row_cf}>
                      <span className={s.cf_title}>{item.cf.toFixed(2)}</span>
                      <img
                        src={cfBg.src}
                        className={s.cf_bg}
                        alt="cf-static-bg"
                      />
                    </div>
                    {item.apples.map((apple: any, ind: any) => (
                      <div className={s.apples_row_item}>
                        <img
                          src={appleBg.src}
                          className={s.apple_item_bg}
                          alt="apple-static-bg"
                        />
                        <div className={s.apples_row_item_body}>
                          <div className={s.apple_ico_wrap}>
                            <AppleIco />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
            <div className={s.game_info_wrap}>
              <div className={s.game_info_block}>
                <span className={s.multiplier_title}>
                  Current Multiplier: 1.30x
                </span>
                <span className={s.multiplier_title}>Max Payout: 136.483</span>
              </div>
              <div className={s.btns_block}>
                <button className={s.clear_btn}>Clear</button>
                <button className={s.back_btn}>
                  <img src={backIco.src} alt="back-static-ico" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
