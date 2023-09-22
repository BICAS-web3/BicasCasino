import s from './styles.module.scss'
import Image from 'next/image';
import {networksList} from "@/widgets/NetworkSelect/NetworkSelect";

export const NetworkSelectItem = ({title, ico, id, networkList, setActiveNetwork, setNetworkVisibility, setNetworkList}) => {

    const handleActiveNetworkChange = () => {
        setNetworkVisibility(false)
        const activeNetwork = networksList.filter(item => item.id === id)[0]
        setActiveNetwork(activeNetwork)
        setNetworkList(networksList.filter(item => item.id !== activeNetwork.id))
    }

    return (
        <div className={s.networks_list_item} onClick={handleActiveNetworkChange}>
            <Image src={ico} width={22} height={26} />
            <span className={s.networks_list_item_title}>{title}</span>
        </div>
    )
}