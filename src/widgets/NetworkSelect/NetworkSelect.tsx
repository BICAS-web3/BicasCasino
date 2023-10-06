import s from "./styles.module.scss";
import arbitrumIco from "../../public/media/networkSelect_icons/arbitrumIco.svg";
import bnbIco from "../../public/media/networkSelect_icons/bnbChainIco.svg";
import downIco from "../../public/media/networkSelect_icons/dropDownIco.svg";
import { useState } from "react";
import Image from "next/image";
import { NetworkSelectItem } from "@/widgets/NetworkSelect/NetworkSelectItem";
import { NetworkErrorText } from "@/widgets/NetworkSelect/NetworkErrorText";
import { NetworkError } from "@/widgets/NetworkSelect/NetworkError";

export const networksList = [
  {
    ico: bnbIco,
    title: "bnb chain",
    id: "bnb",
  },
  {
    ico: arbitrumIco,
    title: "arbitrum",
    id: "arbitrum",
  },
];

export const NetworkSelect = () => {
  const [networkListVisibility, setNetworkListVisibility] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(networksList[0]);

  const handleNetworkListVChange = () => {
    !networkListVisibility
      ? setNetworkListVisibility(true)
      : setNetworkListVisibility(false);
  };

  const visibilityStyle = networkListVisibility ? "visible" : "hidden";

  return (
    <div className={s.network_select_wrap}>
      <div className={s.network_select_body} onClick={handleNetworkListVChange}>
        <NetworkError />
        {/* <div className={s.active_network_ico_wrap}>
          <Image
            alt="active-network-ico"
            src={activeNetwork.ico}
            width={30}
            height={30}
          />
        </div>
        <span className={s.active_network_title}>{activeNetwork.title}</span>
        <Image
          alt="dropdown-ico"
          className={s.active_network_dropDown_ico}
          src={downIco}
          width={9}
          height={6}
        /> */}
      </div>
      <div
        className={s.networks_list_wrap}
        style={{
          opacity: `${networkListVisibility && "1"}`,
          visibility: visibilityStyle,
        }}
      >
        <div className={s.networks_list_title_wrap}>
          <h3 className={s.networks_list_title}>Select a network</h3>
        </div>
        <div className={s.networks_list}>
          {networksList &&
            networksList.map((item, ind) => (
              <NetworkSelectItem
                key={ind}
                {...item}
                setActiveNetwork={setActiveNetwork}
                setNetworkVisibility={setNetworkListVisibility}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
