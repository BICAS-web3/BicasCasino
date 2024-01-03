import { FC } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { VipPageBanner } from "@/widgets/vipPageBanner/VipPageBanner";
import { VipStatuses } from "@/widgets/vipStatuses/VipStatuses";
import { VipPriveleges } from "@/widgets/vipPriveleges/VipPriveleges";
import { VipFaq } from "@/widgets/vipFaq/VipFaq";

interface VipPageProps {}

const VipPage: FC<VipPageProps> = () => {
  return (
    <Layout gameName={undefined}>
      <section className={s.vip_section}>
        <VipPageBanner />
        <VipStatuses />
        <VipPriveleges />
        <VipFaq />
      </section>
    </Layout>
  );
};

export default VipPage;
