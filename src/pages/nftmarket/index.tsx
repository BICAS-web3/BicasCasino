import { FC, useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

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
  const getNumber = (el: string | number) => {
    return Number(String(el).replace(/\D/g, ""));
  };

  const { address, isConnected } = useAccount();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [models, setModels] = useState<any[]>([
    { contractModel: MODEL_1, count: 0, fee: 0 },
    { contractModel: MODEL_2, count: 0, fee: 0 },
    { contractModel: MODEL_3, count: 0, fee: 0 },
    { contractModel: MODEL_4, count: 0, fee: 0 },
    { contractModel: MODEL_5_1, count: 0, fee: 0 },
    { contractModel: MODEL_5_2, count: 0, fee: 0 },
  ]);

  const { data: getNft_5, isSuccess: getNftSuccess_5 } = useContractRead({
    chainId: 97,
    address: models[5].contractModel,
    abi,
    functionName: "maxGods",
    args: [],
    enabled: true,
  });

  const { data: getNft_4, isSuccess: getNftSuccess_4 } = useContractRead({
    chainId: 97,
    address: models[4].contractModel,
    abi,
    functionName: "maxGods",
    args: [],
    enabled: true,
    watch: isConnected,
  });
  const { data: getNft_3, isSuccess: getNftSuccess_3 } = useContractRead({
    chainId: 97,
    address: models[3].contractModel,
    abi,
    functionName: "maxGods",
    args: [],
    enabled: true,
    watch: isConnected,
  });
  const { data: getNft_2, isSuccess: getNftSuccess_2 } = useContractRead({
    chainId: 97,
    address: models[2].contractModel,
    abi,
    functionName: "maxGods",
    args: [],
    enabled: true,
    watch: isConnected,
  });
  const { data: getNft_1, isSuccess: getNftSuccess_1 } = useContractRead({
    chainId: 97,
    address: models[1].contractModel,
    abi,
    functionName: "maxGods",
    args: [],
    enabled: true,
    watch: isConnected,
  });
  const { data: getNft_0, isSuccess: getNftSuccess_0 } = useContractRead({
    chainId: 97,
    address: models[0].contractModel,
    abi,
    functionName: "maxGods",
    args: [],
    enabled: true,
    watch: isConnected,
  });

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
    if (getNftSuccess_5) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[5] = {
          contractModel: models[5].contractModel,
          count: getNumber(getNft_5 as string | number),
          fee: mintFee_5,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (getNftSuccess_4) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[4] = {
          contractModel: models[4].contractModel,
          count: getNumber(getNft_4 as string | number),
          fee: mintFee_4,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (getNftSuccess_3) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[3] = {
          contractModel: models[3].contractModel,
          count: getNumber(getNft_3 as string | number),
          fee: mintFee_3,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (getNftSuccess_2) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[2] = {
          contractModel: models[2].contractModel,
          count: getNumber(getNft_2 as string | number),
          fee: mintFee_2,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (getNftSuccess_1) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[1] = {
          contractModel: models[1].contractModel,
          count: getNumber(getNft_1 as string | number),
          fee: mintFee_1,
        };
        return updatedModels;
      });
    }
  }, []);
  useEffect(() => {
    if (getNftSuccess_0) {
      setModels((prevModels) => {
        const updatedModels = [...prevModels];
        updatedModels[0] = {
          contractModel: models[0].contractModel,
          count: getNumber(getNft_0 as string | number),
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

  const renderNFTCards = (model: any) => {
    return Array.from({ length: model.count }).map((_, i) => (
      <NFTCard
        fee={model?.fee}
        contractAddress={model.contractModel}
        img=""
        name="NFT name"
        number={i}
        price={34}
        key={i}
        id={i + 1}
      />
    ));
  };

  return <>{models.map((model) => renderNFTCards(model))}</>;
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
