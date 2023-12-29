import { FC } from "react";
import s from "./styles.module.scss";
import { SupportBlock } from "@/widgets/supportBlock/SupportBlock";
import { Layout } from "@/widgets/Layout";

interface SupportProps {}

const Support: FC<SupportProps> = () => {
  return (
    <Layout gameName={undefined}>
      <section className={s.support_page_container}>
        <SupportBlock />
      </section>
    </Layout>
  );
};

export default Support;
