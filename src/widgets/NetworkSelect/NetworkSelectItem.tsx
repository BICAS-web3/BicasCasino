import s from "./styles.module.scss";
import Image from "next/image";
import { networksList } from "@/widgets/NetworkSelect/NetworkSelect";
import { FC } from "react";

interface Network {
  title: string;
  id: string;
  ico: string;
}

interface NetworkSelectItemProps {
  title: string;
  id: string;
  ico: string;
  setNetworkVisibility: (isVisible: boolean) => void;
  setActiveNetwork: (language: Network) => void;
}

export const NetworkSelectItem: FC<NetworkSelectItemProps> = ({
  title,
  ico,
  id,
  setActiveNetwork,
  setNetworkVisibility,
}) => {
  const handleActiveNetworkChange = () => {
    setNetworkVisibility(false);
    const activeNetwork = networksList.filter((item) => item.id === id)[0];
    setActiveNetwork(activeNetwork);
  };

  return (
    <div className={s.networks_list_item} onClick={handleActiveNetworkChange}>
      <Image alt="network-ico" src={ico} width={22} height={26} />
      <span className={s.networks_list_item_title}>{title}</span>
    </div>
  );
};
