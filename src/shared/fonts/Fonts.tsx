import localFont from 'next/font/local';
import { FC } from 'react';


const DalekPinpointFont = localFont({
    src: [
        {
            path: './fonts/DalekPinpointBold.ttf',
            style: 'normal',
            weight: '700'
        }
    ]
});

const NeueMachinaFont = localFont(
    {
        src: [
            {
                path: './fonts/NeueMachina-Light.otf',
                style: 'normal',
                weight: '400'
            },
            {
                path: './fonts/NeueMachina-Regular.otf',
                style: 'normal',
                weight: '700'
            },
            {
                path: './fonts/NeueMachina-Ultrabold.otf',
                style: 'normal',
                weight: '900'
            }
        ]
    }
)

export const Fonts: FC = () => (
    <style jsx global>
        {`
            :root {
                --font-dalek-pinpoint: ${DalekPinpointFont.style.fontFamily};
                --font-neue-machina: ${NeueMachinaFont.style.fontFamily};
            }
        `}
    </style>
)