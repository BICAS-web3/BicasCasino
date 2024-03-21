import localFont from "next/font/local";
import { FC } from "react";
import { Nunito_Sans, Source_Sans_3 } from "next/font/google";

const source_sans_3 = Source_Sans_3({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
    "vietnamese",
  ],
});

const nunito_sans = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
});

const DalekPinpointFont = localFont({
  src: [
    {
      path: "./fonts/DalekPinpointBold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
});

const NeueMachinaFont = localFont({
  src: [
    {
      path: "./fonts/NeueMachina-Light.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/NeueMachina-Regular.otf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./fonts/NeueMachina-Ultrabold.otf",
      style: "normal",
      weight: "900",
    },
  ],
});

export const Fonts: FC = () => (
  <style jsx global>
    {`
      :root {
        --font-dalek-pinpoint: ${DalekPinpointFont.style.fontFamily};
        --font-neue-machina: ${NeueMachinaFont.style.fontFamily};
        --font-source-sans-3: ${source_sans_3.style.fontFamily};
        --font-nunito-sans: ${nunito_sans.style.fontFamily};
      }
    `}
  </style>
);
