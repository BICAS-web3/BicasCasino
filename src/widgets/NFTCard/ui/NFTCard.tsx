import { FC, useEffect, useState } from "react";

import Image from "next/image";

import { ABI as abi } from "@/shared/contracts/MinNFTAbi";

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
  contractAddress: string;
  fee: any;
}

export const NFTCard: FC<NFTCardProps> = (props) => {
  const { name, number, price, id, contractAddress, fee } = props;

  const [getImg, setGetImg] = useState<any>();

  const { isConnected } = useAccount();
  const {
    data: imgurl,
    isSuccess: imgIsSuccess,
    error,
  } = useContractRead({
    chainId: 97,
    address: contractAddress as `0x${string}`,
    abi,
    functionName: "tokenURI",
    args: [id],
    enabled: true,
  });
  useEffect(() => {
    if (imgIsSuccess) {
      setGetImg(imgurl);
    }
    if (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    alert(fee);
  }, []);

  // const {
  //   data: mintFee,
  //   isSuccess,
  //   error: feeErr,
  // } = useContractRead({
  //   chainId: 97,
  //   address: contractAddress as `0x${string}`,
  //   abi,
  //   functionName: "getMintFee",
  //   args: [],
  //   enabled: true,
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     setFee(mintFee as bigint);
  //     console.log(mintFee);
  //   }
  //   if (feeErr) {
  //     console.log("err:", feeErr);
  //   }
  // }, []);

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

  const handleMintNft = () => {
    if (isConnected) {
      mintNft?.();
    }
  };

  if (getImg)
    return (
      <article onClick={handleMintNft} className={s.nft}>
        <div className={s.nft_image}>
          <Image
            layout="responsive"
            width={1024}
            height={1024}
            src={getImg}
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
