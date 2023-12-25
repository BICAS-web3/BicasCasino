import Head from "next/head";
import { Header } from "@/widgets/header/index";
import s from "./style.module.scss";
import { Layout } from "@/widgets/Layout";

import section_about_1 from "@/public/media/bonus_images/section_about_1.png";
import section_about_2 from "@/public/media/bonus_images/section_about_2.png";
import section_about_3 from "@/public/media/bonus_images/section_about_3.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bonus</title>
      </Head>
      <Layout gameName={undefined}>
        <div className={s.main_container}>
          <section className={s.about_section}>
            <div>
              <Image src={section_about_1} alt="" />
            </div>
            <div></div>
            <div></div>
          </section>
        </div>
      </Layout>
    </>
  );
}
