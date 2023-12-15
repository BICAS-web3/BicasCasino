// import Image from "next/image";
// import { FC, SetStateAction, useEffect, useState } from "react";
// import s from "./styles.module.scss";
// import playerIconBig from "@/public/media/player_icons/playerIconBig.webp";
// import GKEagle from "@/public/media/brand_images/GKEagle.png";
// import Pen from "@/public/media/misc/pen.svg";
// import AcceptIcon from "@/public/media/misc/acceptIcon.svg";
// import { sessionModel } from "@/entities/session";
// import { useUnit } from "effector-react";
// import * as Api from "@/shared/api";
// import { web3 } from "@/entities/web3";
// import { keccak256 } from "ethers/lib/utils";

// interface ProfileInfoProps {
//     queried_address: string
// };
// const ProfileInfo: FC<ProfileInfoProps> = props => {

//     const [
//         currentWalletAddress,
//         currentNickName,
//         setCurrentNickName,
//         logIn,

//     ] = useUnit([
//         sessionModel.$currentWalletAddress,
//         sessionModel.$currentNickname,
//         sessionModel.setCurrentNickname,
//         sessionModel.logIn
//     ]);

//     const [
//         web3Provider
//     ] = useUnit([
//         web3.web3Provider
//     ]);

//     const [editNickname, setEditNickname] = useState(false);

//     const [pageNickname, setPageNickname] = useState<string | null>(null);

//     //const [pickedNickname, setPickedNickName] = useState(currentNickName);

//     useEffect(() => {
//         Api.getUsernameFx({
//             address: props.queried_address
//         }).then((response) => {
//             const body = response.body as Api.T_Nickname;
//             if (body.nickname != body.address) {
//                 setPageNickname(body.nickname);
//             }
//         })
//     }, []);

//     const onChangeNickName = async (event: {
//         target: {
//             value: SetStateAction<string>;
//         };
//     }) => {
//         setCurrentNickName(event.target.value.toString());
//         setPageNickname(event.target.value.toString());
//     };

//     const onSubmitHandle = async () => {
//         var signed = '';
//         try {
//             signed = await web3Provider?.send(
//                 "personal_sign",
//                 [currentWalletAddress, currentNickName]
//             ) as string;
//         } catch (error) {
//             return;
//         }
//         await Api.setUsernameFx({
//             address: currentWalletAddress as string,
//             nickname: currentNickName as string,
//             signature: signed.slice(2)
//         });

//         logIn({ address: currentWalletAddress as string });
//         setPageNickname(currentNickName);
//         setEditNickname(false);
//     };

//     return (<div className={s.profile_info_container}>
//         <div className={s.profile_wrapper}>
//             <Image
//                 src={playerIconBig}
//                 alt={''}
//                 width={114}
//                 height={114}
//             >
//             </Image>

//             <div className={s.profile_info}>
//                 {

//                     <div className={s.set_nickname_container}>
//                         <form action="javascript:void(0);" onSubmit={onSubmitHandle}>
//                             {
//                                 editNickname ?
//                                     <input
//                                         className={s.set_nickname_input_active}
//                                         type='text'
//                                         maxLength={20}
//                                         value={currentWalletAddress?.toLowerCase() == props.queried_address ?
//                                             (pageNickname != null ? currentNickName as string : "No Nickname") : (pageNickname != null ? pageNickname as string : "No Nickname")}
//                                         onChange={onChangeNickName}
//                                     /> : <input
//                                         className={s.set_nickname_input_inacative}
//                                         type='text'
//                                         maxLength={20}
//                                         disabled
//                                         value={pageNickname != null ? pageNickname as string : "No Nickname"}
//                                     />
//                             }

//                         </form>
//                         <div
//                             style={{
//                                 display: currentWalletAddress == props.queried_address && !editNickname ? 'block' : 'none'
//                             }}
//                             className={s.edit_button}
//                             onClick={(_) => { setEditNickname(true); }}>
//                             <Image
//                                 src={Pen}
//                                 alt={''}
//                                 width={32}
//                                 height={32}
//                             />
//                         </div>
//                         <div
//                             style={{
//                                 display: editNickname ? 'block' : 'none'
//                             }}
//                             className={s.edit_button}
//                             onClick={onSubmitHandle}>
//                             <Image
//                                 src={AcceptIcon}
//                                 alt={''}
//                                 width={32}
//                                 height={32}
//                             />
//                         </div>
//                     </div>
//                 }

//                 <div className={s.profile_wallet}>
//                     {props.queried_address}
//                 </div>
//                 {/* </> : <div className={s.profile_name}>
//                         Not Connected
//                     </div> */}
//                 {/* } */}
//             </div>
//         </div>
//     </div>);
// }

// export interface ProfileHeaderProps {
//     queried_address: string
// };

// export const ProfileHeader: FC<ProfileHeaderProps> = props => {
//     return (<div className={s.profile_header}>
//         <ProfileInfo queried_address={props.queried_address}></ProfileInfo>
//         <div className={s.eagle_image}>
//             <Image
//                 src={GKEagle}
//                 alt={''}
//                 width={400}
//                 height={350}
//             />
//         </div>
//     </div>);
// }
