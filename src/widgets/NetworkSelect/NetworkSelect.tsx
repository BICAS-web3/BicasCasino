import s from "./styles.module.scss";
import arbitrumIco from "../../public/media/networkSelect_icons/arbitrumIco.svg";
import bnbIco from "../../public/media/networkSelect_icons/bnbChainIco.svg";
import downIco from "../../public/media/networkSelect_icons/dropDownIco.svg";

import { FC, useEffect, useState } from "react";
import Image from "next/image";

import { NetworkSelectItem } from "@/widgets/NetworkSelect/NetworkSelectItem";
import { NetworkErrorText } from "@/widgets/NetworkSelect/NetworkErrorText";
import { NetworkError } from "@/widgets/NetworkSelect/NetworkError";
import errorInfoIco from "../../public/media/networkSelect_icons/errorInfoIco.svg";
// 
import { useUnit } from "effector-react";
// import { useAccount, useBalance, useNetwork } from "wagmi";
import { sessionModel } from "@/entities/session";
import { useDropdown } from "@/shared/tools";
import clsx from "clsx";

export const networksList = [
  // {
  //     ico: errorInfoIco,
  //     title: 'error',
  //     id: 'network_error'
  // },
  {
    ico: bnbIco,
    title: "bnb chain",
    id: 5,
  },
  {
    ico: arbitrumIco,
    title: "arbitrum",
    id: 6,
  },
];

export interface NetworkSelectProps {
  isGame: boolean;
}
export const NetworkSelect: FC<NetworkSelectProps> = (props) => {
  // const { chain } = useNetwork();
  const { isOpen, toggle, close, dropdownRef } = useDropdown();
  // const { data } = useBalance();
  const [activeNetwork, setActiveNetwork] = useState<number | undefined>(-1);
  // const { isConnected } = useAccount();

  const [currentBalance] = useUnit([
    // networkList
    // web3.$Chains,
    sessionModel.$currentBalance,
  ]);

  // useEffect(() => {
  //   if (chain == undefined || chain == null) {
  //     return;
  //   }

  //   const network = networkList.chains.find(
  //     (network: any) => network.id == chain.id
  //   );
  //   if (network == undefined) {
  //     setActiveNetwork(undefined);
  //     return;
  //   }
  //   setActiveNetwork(chain.id);
  // }, [chain]);

  const [networkListVisibility, setNetworkListVisibility] =
    useState<boolean>(false);
  //const [activeNetwork, setActiveNetwork] = useState(networksList[0]);

  //const [
  //    Chains
  //] = useUnit([
  //    web3.$Chains,
  //]);

  return (
    <>
      {true ? ( // isConnected
        <div ref={dropdownRef} className={s.network_select_wrap}>
          {activeNetwork === undefined ? (
            <NetworkError networkChange={toggle} />
          ) : (
            <div className={s.network_select_body} onClick={toggle}>
              <div className={s.active_network_ico_wrap}>
                <Image
                  src={`/static/media/networks/${activeNetwork}.svg`}
                  width={30}
                  height={30}
                  alt=""
                />
              </div>
              <span className={s.active_network_title}>
                {/* {currentBalance && props.isGame ? currentBalance : chain?.name} */}
              </span>
              <Image
                className={clsx(
                  s.active_network_dropDown_ico,
                  isOpen && s.active_network_dropDown_ico_open
                )}
                src={downIco}
                width={9}
                height={6}
                alt=""
              />
            </div>
          )}
          <div
            className={clsx(
              s.networks_list_wrap,
              isOpen && s.networks_list_wrap_open,
              activeNetwork === undefined && s.undefined_network
            )}
          >
            <>
              {activeNetwork === undefined && (
                <NetworkErrorText error_text="wrong network" />
              )}
              <div className={s.networks_list_title_wrap}>
                <h3 className={s.networks_list_title}>Select a network</h3>
              </div>
              <div className={s.networks_list}>
                {/* {networkList &&
                  networkList.chains.map((item: any, ind: number) => {
                    if (item.id == activeNetwork) {
                      return <></>;
                    }
                    return (
                      <NetworkSelectItem
                        key={ind}
                        title={item.network}
                        id={item.id}
                        networkList={networkList}
                        setActiveNetwork={setActiveNetwork}
                        setNetworkVisibility={setNetworkListVisibility}
                        close={close}
                      />
                    );
                  })} */}
              </div>
            </>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
