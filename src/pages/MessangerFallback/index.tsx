import { FC, useEffect } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { MessangerFallbackBlock } from "@/widgets/MessangerFallbackBlock/MessangerFallbackBlock";

interface MessangerFallbackProps {}

const MessangerFallback: FC<MessangerFallbackProps> = () => {
  useEffect(() => {
    document.documentElement.classList.add("hidden_scroll_two");
  }, []);

  return (
    <Layout gameName={undefined}>
      <MessangerFallbackBlock />
    </Layout>
  );
};

export default MessangerFallback;
