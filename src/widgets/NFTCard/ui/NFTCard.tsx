import { FC, useEffect, useState } from "react";

import Image from "next/image";

import { ABI as abi } from "@/shared/contracts/MinNFTAbi";

import card_image from "@/public/media/nftMarket_images/nftCard.png";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";

import s from "./styles.module.scss";

export interface NFTCardProps {
  img: string;
  name: string;
  number: number;
  price: number;
  id?: number;
}

export const NFTCard: FC<NFTCardProps> = (props) => {
  const { name, number, price, id } = props;

  const [fee, setFee] = useState<bigint>(BigInt(0));

  const { chain } = useNetwork();

  const { isConnected } = useAccount();

  const { data: mintFee, isSuccess } = useContractRead({
    chainId: chain?.id,
    address: `` as `0x${string}`,
    abi,
    functionName: "getMintFee",
    args: [],
    enabled: true,
    watch: isConnected,
  });

  useEffect(() => {
    if (isSuccess) {
      setFee(mintFee as bigint);
    }
  }, [isSuccess, mintFee]);

  const { config: mintNftConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: `` as `0x${string}`,
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
        <Image src={card_image} alt="nft_img" />
      </div>
      <div className={s.nft_about}>
        <span className={s.nft_name}>{name}</span>
        <span className={s.nft_number}>#{number}</span>
      </div>
      <span className={s.nft_price}>{price} ETH</span>
    </article>
  );
};
