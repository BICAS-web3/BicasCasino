import { FC, useEffect, useState, useRef, useCallback } from "react";
import Head from "next/head";
import { Layout } from "@/widgets/Layout";
import { NFTCard } from "@/widgets/NFTCard";
import {
  MODEL_1,
  MODEL_2,
  MODEL_3,
  MODEL_4,
} from "@/shared/nftContractAddress";
import * as Api from "@/shared/api";
import s from "./style.module.scss";

const PAGE_SIZE = 100;
const TOTAL_PAGES = 8;

interface IProps {
  refLink: React.RefObject<HTMLDivElement>;
}

const ConnectMarket: FC<IProps> = ({ refLink }) => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [currentPageRef, setCurrentRef] = useState(1);
  const loadingRef = useRef(false);

  const loadNFTs = useCallback(async (page: number) => {
    try {
      loadingRef.current = true;
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newNFTs = await Promise.all(
        Array.from({ length: PAGE_SIZE }).map(async (_, index) => {
          const data = await Api.GetNftMarket(start + index);
          return { ...data, id: start + index };
        })
      );
      setNfts((prevNFTs) => [...prevNFTs, ...newNFTs]);
    } catch (error) {
      console.error("Error loading NFTs:", error);
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = refLink.current!;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      currentPageRef < TOTAL_PAGES
    ) {
      setCurrentRef((prev) => prev + 1);
    }
  }, [refLink.current?.clientHeight]);

  useEffect(() => {
    if (currentPageRef <= TOTAL_PAGES) {
      loadNFTs(currentPageRef);
    }
  }, [currentPageRef]);

  useEffect(() => {
    refLink.current?.addEventListener("scroll", handleScroll);
    return () => {
      refLink.current?.removeEventListener("scroll", handleScroll);
    };
  }, [refLink, handleScroll]);

  return (
    <>
      {nfts
        .sort((first: any, second: any) => first.id - second.id)
        .map((item: any, i: number) => {
          let cAddress;
          let cFee;
          let index;
          if (i < 25) {
            cAddress = MODEL_1;
            cFee = BigInt(29000000000000000000);
            index = i;
          } else if (i >= 25 && i < 70) {
            cAddress = MODEL_2;
            cFee = BigInt(9000000000000000000);
            index = i % 25;
          } else if (i >= 70 && i < 200) {
            cAddress = MODEL_3;
            cFee = BigInt(1890000000000000000);
            index = i % 70;
          } else if (i >= 200) {
            cAddress = MODEL_4;
            cFee = BigInt(660000000000000000);
            index = i % 200;
          }
          return (
            <NFTCard
              fee={cFee}
              contractAddress={cAddress}
              img={item?.image}
              name={item?.name}
              number={index as number}
              price={
                Number(BigInt(cFee as bigint) / BigInt(1000000000000)) / 1000000
              }
              key={i}
              id={item.id}
              check={i}
            />
          );
        })}
    </>
  );
};

export default function Home() {
  const marketRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>NFT market</title>
      </Head>
      <Layout gameName={undefined}>
        <div className={s.main_container}>
          <div ref={marketRef} className={s.nft_container}>
            <ConnectMarket refLink={marketRef} />
          </div>
        </div>
      </Layout>
    </>
  );
}
