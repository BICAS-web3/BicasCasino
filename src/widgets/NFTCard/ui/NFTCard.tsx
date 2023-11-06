import { FC } from "react";

import Image from "next/image";

import { ABI as abi } from "@/shared/contracts/MinNFTAbi";

import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import s from "./styles.module.scss";

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
  const { name, number, price, id, contractAddress, fee, img } = props;

  const { isConnected } = useAccount();

  const { config: mintNftConfig } = usePrepareContractWrite({
    chainId: 97,
    address: contractAddress as `0x${string}`,
    abi,
    functionName: "mintNft",
    enabled: true,
    args: [id],
    value: fee,
  });

  const { write: mintNft } = useContractWrite(mintNftConfig);

  return (
    <article onClick={() => mintNft?.()} className={s.nft}>
      <div className={s.nft_image}>
        <Image
          layout="responsive"
          width={1024}
          height={1024}
          src={img}
          alt="nft_img"
        />
      </div>
      <div className={s.nft_about}>
        <span className={s.nft_name}>{name}</span>
        <span className={s.nft_number}>#{number}</span>
      </div>
      <span className={s.nft_price}>{price} ETH</span>
    </article>
  );
};
