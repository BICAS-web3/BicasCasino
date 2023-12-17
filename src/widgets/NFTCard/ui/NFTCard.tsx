import { FC, useState } from "react";
import Image from "next/image";
import s from "./styles.module.scss";
import { SkeletonCard } from "@/shared/ui/SkeletonCard";

export interface NFTCardProps {
  img: string;
  name: string;
  number: number;
  price: number;
  id?: number;
  contractAddress?: string;
  fee?: any;
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
      className={s.nft}
    >
      {imageLoaded === false && (
        <Image
          className={s.empty}
          src={img}
          alt="nft_img"
          width={0}
          height={0}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      <div className={s.nft_image}>
        {imageLoaded ? (
          <Image src={img} alt="nft_img" width={1024} height={1024} />
        ) : (
          <SkeletonCard className={s.skeleton} />
        )}
      </div>
      <div className={s.nft_about}>
        <span className={s.nft_name}>{name}</span>
        <span className={s.nft_number}>#{number}</span>
      </div>
    </article>
  );
};

// const { config: mintNftConfig, error } = usePrepareContractWrite({
//   //chainId: 97,
//   address: contractAddress as `0x${string}`,
//   abi,
//   functionName: "mintNft",
//   enabled: true,
//   args: [id],
//   value: fee,
// });

//const { write: mintNft } = useContractWrite(mintNftConfig);
{
  /* <span className={s.nft_price}>{price} BNB</span> */
}
