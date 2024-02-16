import { FC, useEffect } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { AccountFallbackBlock } from "@/widgets/AccountFallbackBlock/AccountFallbackBlock";
// import { useAccount } from "wagmi";
import { useRouter } from "next/router";

interface CheckConnectionProps {}

const CheckConnection: FC<CheckConnectionProps> = () => {
  // const { isConnected, address } = useAccount();
  const router = useRouter();

  // useEffect(() => {
  //   if (isConnected) {
  //     router.push(`/account/${address?.toLowerCase()}`);
  //   }
  // }, [isConnected]);

  return <div></div>;
};

interface AccountFallbackProps {}

const AccountFallback: FC<AccountFallbackProps> = () => {
  useEffect(() => {
    document.documentElement.classList.add("hidden_scroll");
  }, []);

  return (
    <Layout gameName={undefined}>
      <CheckConnection />
      <AccountFallbackBlock />
    </Layout>
  );
};

export default AccountFallback;
