import { useUnit } from "effector-react";
import { useRouter } from "next/router";
import { FC } from "react";
import * as ConnectModel from "@/widgets/Layout/model";

interface IConnectButton {
  className?: string;
}

export const ConnectButton: FC<IConnectButton> = ({ className }) => {
  const [isPartner] = useUnit([ConnectModel.$isPartner]);
  const router = useRouter();
  const queryParams = new URLSearchParams((window as any)?.location?.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  return (
    <button
      onClick={() =>
        router.push(
          isPartner
            ? `/RegistrManual?partner_address=${partner_address}&site_id=${site_id}&sub_id=${sub_id}`
            : "/RegistrManual"
        )
      }
      className={className}
    >
      Connect wallet
    </button>
  );
};
