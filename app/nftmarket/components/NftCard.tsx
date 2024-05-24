import { FC, useState } from "react";
import Image from "next/image";

export interface NFTCardProps {
  img: string;
  name: string;
  number: number;
  price: number;
  id?: number;
  contractAddress?: string;
  fee?: any;
  check?: number;
}

export const NFTCard: FC<NFTCardProps> = (props) => {
  const { name, number, id, img } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      onClick={() => {
        window.open(
          `https://element.market/assets/polygon/0x0d9399e7b92f17352448ad73dd5111de0f292685/${id}`,
          "_blank"
        );
      }}
      className="
        flex flex-col rounded-[8px] bg-[#181818] backdrop-blur-[16px] text-[#fff] font-[--font-nunito-sans]
        p-[4px] tb:p-[10px] mmd:p-[12px] w-fit h-fit overflow-hidden cursor-pointer group 
      "
    >
      <div className="
        rounded-[5px] sm:w-[190px] sm:h-[190px] tmd:w-[230px] tmd:h-[230px]  sm:rounded-[8px] overflow-hidden w-[84px] h-[84px]
      ">
        <Image src={img} className="transition-all duration-500 group-hover:scale-[1.1] w-full h-full" alt="nft_img" width={1024} height={1024} />
      </div>
      <div className="
        flex justify-between items-center px-[2px] sm:px-[0] mt-[5px] sm:mt-[30px] tmd:mt-[15px]
      ">
        <span className="
          text-[8.5px] sm:text-[0.875rem] font-bold leading-normal
        ">{name}</span>
        <span className="
          text-[9.725px] sm:text-[1rem] mt-[4px] sm:mt-[10px] text-[#7e7e7e] tmd:mt-[12px] ml-[auto] font-semibold leading-normal
        ">#{number}</span>
      </div>
    </article>
  );
};