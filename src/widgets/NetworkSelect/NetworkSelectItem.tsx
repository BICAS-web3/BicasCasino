import s from "./styles.module.scss";
import Image from "next/image";
import { networksList } from "@/widgets/NetworkSelect/NetworkSelect";
import { FC } from "react";
import { useSwitchNetwork } from "wagmi";

export interface NetworkSelectItemProps {
  title: string;
  //ico: typeof Image,
  id: number;
  networkList: any;
  setActiveNetwork: any;
  // setNetworkVisibility: any;
  close: () => void;
}
export const NetworkSelectItem: FC<NetworkSelectItemProps> = (props) => {
  const { switchNetwork } = useSwitchNetwork();

  const handleActiveNetworkChange = () => {
    // props.setNetworkVisibility(false)
    props.close();
    //const activeNetwork = networksList.filter(item => item.id === props.id)[0]
    //props.setActiveNetwork(props.id)
    switchNetwork?.(props.id);
    //setNetworkList(networksList.filter(item => item.id !== activeNetwork.id))

    //export interface NetworkSelectItemProps {
    //    title: string,
    //    id: number,
    //    setActiveNetwork: any,
    //    setNetworkVisibility: any
    //};
    //export const NetworkSelectItem: FC<NetworkSelectItemProps> = props => {

    //    const handleActiveNetworkChange = () => {
    //        props.setNetworkVisibility(false)
    //        const activeNetwork = networksList.filter(item => item.id === props.id)[0]
    //        props.setActiveNetwork(activeNetwork)
  };

  return (
    <div className={s.networks_list_item} onClick={handleActiveNetworkChange}>
      <Image
        src={`/static/media/networks/${props.id}.svg`}
        alt=""
        width={22}
        height={26}
      />
      <span className={s.networks_list_item_title}>{props.title}</span>
    </div>
  );
};
