import { FC, useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

import * as Api from "@/shared/api";

import { Layout } from "@/widgets/Layout";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { NFTCard } from "@/widgets/NFTCard";

import { ABI as abi } from "@/shared/contracts/MinNFTAbi";

import {
  MODEL_1,
  MODEL_2,
  MODEL_3,
  MODEL_4,
  MODEL_5_1,
  MODEL_5_2,
} from "@/shared/nftContractAddress";

import s from "./style.module.scss";

const ConnectMarket: FC = () => {
  const [nfts, setNfts] = useState<any>([]);
  const levels = [
    { lvl: 1, count: 25 },
    { lvl: 2, count: 45 },
    { lvl: 3, count: 130 },
    { lvl: 4, count: 250 },
    { lvl: 5, count: 350 },
  ];

  const { address, isConnected } = useAccount();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const setDefaultValue = async () => {
    await Promise.all(
      levels.map(async (model) => {
        const nftData = await Promise.all(
          Array.from({ length: model.count }).map(async (_, index) => {
            const data = await Api.GetNftMarket({
              lvl: model.lvl,
              id: index + 1,
            });
            return data;
          })
        );
        setNfts((prev: any) => [...prev, ...nftData]);
      })
    );
  };
  useEffect(() => {
    nfts.length === 0 && setDefaultValue();
  }, []);

  const [models, setModels] = useState<any[]>([
    { contractModel: MODEL_1, fee: 0 },
    { contractModel: MODEL_2, fee: 0 },
    { contractModel: MODEL_3, fee: 0 },
    { contractModel: MODEL_4, fee: 0 },
    { contractModel: MODEL_5_1, fee: 0 },
    { contractModel: MODEL_5_2, fee: 0 },
  ]);

  // const { data: getNft_5, isSuccess: getNftSuccess_5 } = useContractRead({
  //   chainId: 97,
  //   address: models[5].contractModel,
  //   abi,
  //   functionName: "maxGods",
  //   args: [],
  //   enabled: true,
  // });

  // const { data: getNft_4, isSuccess: getNftSuccess_4 } = useContractRead({
  //   chainId: 97,
  //   address: models[4].contractModel,
  //   abi,
  //   functionName: "maxGods",
  //   args: [],
  //   enabled: true,
  //   watch: isConnected,
  // });
  // const { data: getNft_3, isSuccess: getNftSuccess_3 } = useContractRead({
  //   chainId: 97,
  //   address: models[3].contractModel,
  //   abi,
  //   functionName: "maxGods",
  //   args: [],
  //   enabled: true,
  //   watch: isConnected,
  // });
  // const { data: getNft_2, isSuccess: getNftSuccess_2 } = useContractRead({
  //   chainId: 97,
  //   address: models[2].contractModel,
  //   abi,
  //   functionName: "maxGods",
  //   args: [],
  //   enabled: true,
  //   watch: isConnected,
  // });
  // const { data: getNft_1, isSuccess: getNftSuccess_1 } = useContractRead({
  //   chainId: 97,
  //   address: models[1].contractModel,
  //   abi,
  //   functionName: "maxGods",
  //   args: [],
  //   enabled: true,
  //   watch: isConnected,
  // });
  // const { data: getNft_0, isSuccess: getNftSuccess_0 } = useContractRead({
  //   chainId: 97,
  //   address: models[0].contractModel,
  //   abi,
  //   functionName: "maxGods",
  //   args: [],
  //   enabled: true,
  //   watch: isConnected,
  // });

  const { data: mintFee_0, isSuccess: isSuccessFee_0 } = useContractRead({
    chainId: 97,
    address: models[0].contractModel,
    abi,
    functionName: "getMintFee",
    args: [],
    enabled: true,
  });
  const { data: mintFee_1, isSuccess: isSuccessFee_1 } = useContractRead({
    chainId: 97,
    address: models[1].contractModel,
    abi,
    functionName: "getMintFee",
    args: [],
    enabled: true,
  });
  const { data: mintFee_2, isSuccess: isSuccessFee_2 } = useContractRead({
    chainId: 97,
    address: models[2].contractModel,
    abi,
    functionName: "getMintFee",
    args: [],
    enabled: true,
  });
  const { data: mintFee_3, isSuccess: isSuccessFee_3 } = useContractRead({
    chainId: 97,
    address: models[3].contractModel,
    abi,
    functionName: "getMintFee",
    args: [],
    enabled: true,
  });
  const { data: mintFee_4, isSuccess: isSuccessFee_4 } = useContractRead({
    chainId: 97,
    address: models[4].contractModel,
    abi,
    functionName: "getMintFee",
    args: [],
    enabled: true,
  });
  const { data: mintFee_5, isSuccess: isSuccessFee_5 } = useContractRead({
    chainId: 97,
    address: models[5].contractModel,
    abi,
    functionName: "getMintFee",
    args: [],
    enabled: true,
  });

  useEffect(() => {
    if (isSuccessFee_5) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[5] = {
          contractModel: models[5].contractModel,
          fee: mintFee_5,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (isSuccessFee_4) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[4] = {
          contractModel: models[4].contractModel,
          fee: mintFee_4,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (isSuccessFee_3) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[3] = {
          contractModel: models[3].contractModel,
          fee: mintFee_3,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (isSuccessFee_2) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[2] = {
          contractModel: models[2].contractModel,
          fee: mintFee_2,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (isSuccessFee_1) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[1] = {
          contractModel: models[1].contractModel,
          fee: mintFee_1,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (isSuccessFee_0) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[0] = {
          contractModel: models[0].contractModel,
          fee: mintFee_0,
        };
        return updatedModels;
      });
    }
  }, []);

  useEffect(() => {
    if (chain?.id !== 97 && address) {
      switchNetwork?.(97);
    }
  }, [address]);

  return (
    <>
      {nfts.map((item: any, i: number) => {
        let cAddress;
        let cFee;
        if (i < 25) {
          cAddress = MODEL_1;
          cFee = mintFee_0;
        } else if (i > 25 && i < 70) {
          cAddress = MODEL_2;
          cFee = mintFee_1;
        } else if (i > 70 && i < 200) {
          cAddress = MODEL_3;
          cFee = mintFee_2;
        } else if (i > 200 && i < 450) {
          cAddress = MODEL_4;
          cFee = mintFee_3;
        } else if (i > 450 && i < 625) {
          cAddress = MODEL_5_1;
          cFee = mintFee_4;
        } else if (i > 625) {
          cAddress = MODEL_5_2;
          cFee = mintFee_5;
        }
        console.log(mintFee_0, mintFee_1, mintFee_3, mintFee_4);
        return (
          <NFTCard
            fee={cFee}
            contractAddress={cAddress}
            img={item?.image}
            name={item?.name}
            number={i}
            price={34}
            key={i}
            id={i + 1}
          />
        );
      })}
    </>
  );
};

export default function Home() {
  return (
    <Layout gameName={undefined}>
      <LiveBetsWS subscription_type={"SubscribeAll"} subscriptions={[]} />
      <div className={s.main_container}>
        <div className={s.nft_container}>
          <ConnectMarket />
        </div>
      </div>
    </Layout>
  );
}
