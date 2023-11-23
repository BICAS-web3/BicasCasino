import { FC } from "react";

export interface MineMoneyIconProps {
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}
export const MineMoneyIcon: FC<MineMoneyIconProps> = (props) => {
  const { className, onClick } = props;
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <rect width="90" height="90" rx="10" fill="#FFC148" />
      <rect
        y="1"
        width="90"
        height="89"
        rx="10"
        fill="url(#paint0_linear_2114_53138)"
      />
      <g filter="url(#filter0_f_2114_53138)">
        <circle
          cx="45.8492"
          cy="46.8492"
          r="30.566"
          fill="#F57731"
          fill-opacity="0.7"
        />
      </g>
      <path
        d="M74.7064 42.8744C74.0768 50.9454 71.7075 58.0049 67.3105 64.8813L56.0086 72.651C52.2733 73.5657 48.6448 74.0177 45.0055 74.0177C41.3663 74.0177 37.727 73.5657 33.9917 72.651L22.6898 64.8813C18.2929 58.0049 15.9129 50.9347 15.2939 42.8744L18.2075 30.7249C23.2234 24.1928 28.9971 19.5439 36.1902 16.2832H53.8208C61.0139 19.5439 66.7876 24.1928 71.8036 30.7249L74.7171 42.8744H74.7064Z"
        fill="#826F87"
      />
      <path
        d="M65.0269 37.8176L71.7932 30.7366C66.7772 24.2045 61.0035 19.5556 53.8104 16.2949L44.9951 23.1499C53.4689 26.4213 59.328 30.6936 65.0269 37.8176Z"
        fill="#FCD403"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M65.0269 37.8176L71.7932 30.7366C66.7772 24.2045 61.0035 19.5556 53.8104 16.2949L44.9951 23.1499C53.4689 26.4213 59.328 30.6936 65.0269 37.8176Z"
        fill="url(#paint1_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "multiply",
        }}
        opacity="0.7"
        d="M65.0269 37.8176L71.7932 30.7366C66.7772 24.2045 61.0035 19.5556 53.8104 16.2949L44.9951 23.1499C53.4689 26.4213 59.328 30.6936 65.0269 37.8176Z"
        fill="url(#paint2_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M65.0269 37.8176L71.7932 30.7366C66.7772 24.2045 61.0035 19.5556 53.8104 16.2949L44.9951 23.1499C53.4689 26.4213 59.328 30.6936 65.0269 37.8176Z"
        fill="url(#paint3_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "multiply",
        }}
        opacity="0.7"
        d="M65.0269 37.8176L71.7932 30.7366C66.7772 24.2045 61.0035 19.5556 53.8104 16.2949L44.9951 23.1499C53.4689 26.4213 59.328 30.6936 65.0269 37.8176Z"
        fill="url(#paint4_radial_2114_53138)"
      />
      <path
        d="M74.7061 42.8741L71.7926 30.7354L65.0264 37.8163L74.7061 42.8741Z"
        fill="#FFF7DC"
      />
      <path
        d="M65.026 37.8164C64.5991 46.899 62.326 53.9584 57.374 61.5559L67.3099 64.8919C71.7069 58.0154 74.0868 50.9452 74.7058 42.885L65.026 37.8164Z"
        fill="#FCD403"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M65.026 37.8164C64.5991 46.899 62.326 53.9584 57.374 61.5559L67.3099 64.8919C71.7069 58.0154 74.0868 50.9452 74.7058 42.885L65.026 37.8164Z"
        fill="url(#paint5_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "multiply",
        }}
        opacity="0.7"
        d="M65.026 37.8164C64.5991 46.899 62.326 53.9584 57.374 61.5559L67.3099 64.8919C71.7069 58.0154 74.0868 50.9452 74.7058 42.885L65.026 37.8164Z"
        fill="url(#paint6_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M65.026 37.8164C64.5991 46.899 62.326 53.9584 57.374 61.5559L67.3099 64.8919C71.7069 58.0154 74.0868 50.9452 74.7058 42.885L65.026 37.8164Z"
        fill="url(#paint7_radial_2114_53138)"
      />
      <path
        d="M44.9943 23.1382L36.1791 16.2832C28.9859 19.5439 23.2123 24.1928 18.1963 30.7249L24.9625 37.8059C30.6615 30.6819 36.5099 26.3989 44.9943 23.1382Z"
        fill="#FCD403"
      />
      <path
        style={{
          mixBlendMode: "multiply",
        }}
        opacity="0.7"
        d="M44.9943 23.1382L36.1791 16.2832C28.9859 19.5439 23.2123 24.1928 18.1963 30.7249L24.9625 37.8059C30.6615 30.6819 36.5099 26.3989 44.9943 23.1382Z"
        fill="url(#paint8_radial_2114_53138)"
      />
      <path
        d="M55.998 72.6535L67.3106 64.8946L57.3748 61.5586L55.998 72.6535Z"
        fill="#FE9F11"
      />
      <g
        style={{
          mixBlendMode: "overlay",
        }}
        opacity="0.3"
      >
        <path
          d="M55.998 72.6535L67.3106 64.8946L57.3748 61.5586L55.998 72.6535Z"
          fill="#DA7D08"
        />
      </g>
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M55.998 72.6535L67.3106 64.8946L57.3748 61.5586L55.998 72.6535Z"
        fill="url(#paint9_radial_2114_53138)"
      />
      <path
        d="M22.1885 64.0983C22.3486 64.3565 22.5087 64.6256 22.6794 64.8838L33.2023 72.1155L32.6153 61.5586L22.1885 64.0983Z"
        fill="#FEE145"
      />
      <path
        style={{
          mixBlendMode: "screen",
        }}
        d="M31.8896 63.4203L33.2023 72.1155L32.6153 61.5586L22.1885 64.0983C22.3486 64.3565 31.8896 63.4203 31.8896 63.4203Z"
        fill="url(#paint10_radial_2114_53138)"
      />
      <path
        d="M44.995 63.4203C39.883 63.4203 34.771 62.7961 32.6152 61.5586L33.2022 72.1154L33.9813 72.6535C37.7166 73.5682 41.3558 74.0202 44.995 74.0202C48.6343 74.0202 52.2735 73.5682 55.9982 72.6535L57.3642 61.5586C55.2084 62.7961 50.0964 63.4203 44.995 63.4203Z"
        fill="#FCD403"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M44.995 63.4203C39.883 63.4203 34.771 62.7961 32.6152 61.5586L33.2022 72.1154L33.9813 72.6535C37.7166 73.5682 41.3558 74.0202 44.995 74.0202C48.6343 74.0202 52.2735 73.5682 55.9982 72.6535L57.3642 61.5586C55.2084 62.7961 50.0964 63.4203 44.995 63.4203Z"
        fill="url(#paint11_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "multiply",
        }}
        d="M44.995 63.4203C39.883 63.4203 34.771 62.7961 32.6152 61.5586L33.2022 72.1154L33.9813 72.6535C37.7166 73.5682 41.3558 74.0202 44.995 74.0202C48.6343 74.0202 52.2735 73.5682 55.9982 72.6535L57.3642 61.5586C55.2084 62.7961 50.0964 63.4203 44.995 63.4203Z"
        fill="url(#paint12_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M44.995 63.4203C39.883 63.4203 34.771 62.7961 32.6152 61.5586L33.2022 72.1154L33.9813 72.6535C37.7166 73.5682 41.3558 74.0202 44.995 74.0202C48.6343 74.0202 52.2735 73.5682 55.9982 72.6535L57.3642 61.5586C55.2084 62.7961 50.0964 63.4203 44.995 63.4203Z"
        fill="url(#paint13_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "multiply",
        }}
        opacity="0.7"
        d="M44.995 63.4203C39.883 63.4203 34.771 62.7961 32.6152 61.5586L33.2022 72.1154L33.9813 72.6535C37.7166 73.5682 41.3558 74.0202 44.995 74.0202C48.6343 74.0202 52.2735 73.5682 55.9982 72.6535L57.3642 61.5586C55.2084 62.7961 50.0964 63.4203 44.995 63.4203Z"
        fill="url(#paint14_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "screen",
        }}
        d="M33.2023 62.893C35.3581 64.1305 40.4701 64.7547 45.5821 64.7547C50.1392 64.7547 54.6962 64.2597 57.1615 63.2696L57.3749 61.5586C55.2192 62.7961 50.1071 63.4203 45.0058 63.4203C39.9045 63.4203 34.7818 62.7961 32.626 61.5586L33.213 72.1155V62.8822L33.2023 62.893Z"
        fill="url(#paint15_radial_2114_53138)"
      />
      <path
        d="M18.1967 30.7354L15.2832 42.8741L24.963 37.8163L18.1967 30.7354Z"
        fill="#FE9F11"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M18.1967 30.7354L15.2832 42.8741L24.963 37.8163L18.1967 30.7354Z"
        fill="url(#paint16_radial_2114_53138)"
      />
      <path
        d="M24.9629 37.8163L15.2832 42.8849C15.8808 50.6438 18.1114 57.4772 22.1882 64.1062L32.615 61.5665C27.663 53.969 25.3898 46.9096 24.9629 37.827V37.8163Z"
        fill="#FE9F11"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M24.9629 37.8163L15.2832 42.8849C15.8808 50.6438 18.1114 57.4772 22.1882 64.1062L32.615 61.5665C27.663 53.969 25.3898 46.9096 24.9629 37.827V37.8163Z"
        fill="url(#paint17_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M24.9629 37.8163L15.2832 42.8849C15.8808 50.6438 18.1114 57.4772 22.1882 64.1062L32.615 61.5665C27.663 53.969 25.3898 46.9096 24.9629 37.827V37.8163Z"
        fill="url(#paint18_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M24.9629 37.8163L15.2832 42.8849C15.8808 50.6438 18.1114 57.4772 22.1882 64.1062L32.615 61.5665C27.663 53.969 25.3898 46.9096 24.9629 37.827V37.8163Z"
        fill="url(#paint19_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "screen",
        }}
        d="M22.1885 64.0947L32.6153 61.555C31.2279 59.435 30.0646 57.3581 29.0828 55.2596C29.0828 55.2596 30.865 60.1668 31.5907 61.286L22.1885 64.1055V64.0947Z"
        fill="url(#paint20_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M46.1046 20.9111C37.1613 24.3655 30.982 28.8853 24.9629 36.3967C25.4111 45.985 27.8124 53.4319 33.0418 61.449C35.315 62.7619 40.7151 63.4184 46.1046 63.4184C51.4941 63.4184 56.8943 62.7619 59.1675 61.449C64.3969 53.4211 66.7981 45.9743 67.2464 36.3967C61.2272 28.8745 55.0587 24.3548 46.1046 20.9111Z"
        fill="url(#paint21_radial_2114_53138)"
      />
      <path
        d="M44.9947 23.1398C36.5209 26.4113 30.6725 30.6835 24.9629 37.8075C25.3898 46.8901 27.663 53.9495 32.6149 61.547C34.7707 62.7845 39.8827 63.4087 44.9947 63.4087C50.1067 63.4087 55.2187 62.7845 57.3639 61.547C62.3158 53.9495 64.589 46.8901 65.0159 37.8075C59.3169 30.6835 53.4685 26.4005 44.984 23.1398H44.9947Z"
        fill="#FCD403"
      />
      <path
        style={{
          mixBlendMode: "multiply",
        }}
        d="M44.9947 23.1398C36.5209 26.4113 30.6725 30.6835 24.9629 37.8075C25.3898 46.8901 27.663 53.9495 32.6149 61.547C34.7707 62.7845 39.8827 63.4087 44.9947 63.4087C50.1067 63.4087 55.2187 62.7845 57.3639 61.547C62.3158 53.9495 64.589 46.8901 65.0159 37.8075C59.3169 30.6835 53.4685 26.4005 44.984 23.1398H44.9947Z"
        fill="url(#paint22_radial_2114_53138)"
      />
      <path
        style={{
          mixBlendMode: "overlay",
        }}
        d="M44.9947 23.1398C36.5209 26.4113 30.6725 30.6835 24.9629 37.8075C25.3898 46.8901 27.663 53.9495 32.6149 61.547C34.7707 62.7845 39.8827 63.4087 44.9947 63.4087C50.1067 63.4087 55.2187 62.7845 57.3639 61.547C62.3158 53.9495 64.589 46.8901 65.0159 37.8075C59.3169 30.6835 53.4685 26.4005 44.984 23.1398H44.9947Z"
        fill="url(#paint23_radial_2114_53138)"
      />
      <g
        style={{
          mixBlendMode: "overlay",
        }}
        opacity="0.1"
      >
        <path
          d="M65.0269 37.8171C59.3279 30.6931 53.4795 26.4101 44.9951 23.1494C40.5661 24.8605 36.8521 26.8405 33.5117 29.3695C49.5094 24.387 62.9565 34.7178 62.4442 51.5916C63.981 47.3301 64.7921 42.8965 65.0376 37.8171H65.0269Z"
          fill="#1D1D1B"
        />
      </g>
      <g
        style={{
          mixBlendMode: "overlay",
        }}
        opacity="0.3"
      >
        <path
          d="M25.4965 37.1707C25.3151 37.3859 25.1443 37.6012 24.9629 37.8164C25.3898 46.899 27.663 53.9584 32.6149 61.5559C34.7707 62.7934 39.8827 63.4176 44.9947 63.4176C50.1067 63.4176 55.2187 62.7934 57.3639 61.5559C57.6307 61.1577 57.8761 60.7595 58.1216 60.3614C43.9168 60.017 30.5872 50.547 25.4965 37.1707Z"
          fill="white"
        />
      </g>
      <path
        style={{
          mixBlendMode: "screen",
        }}
        d="M58.3884 59.6955C56.2326 60.933 51.1206 61.5572 46.0193 61.5572C40.9179 61.5572 35.7952 60.933 33.6394 59.6955C28.7942 52.2594 26.521 45.3399 26.0194 36.5371C25.6672 36.9568 25.3151 37.3765 24.9629 37.8177C25.3898 46.9003 27.663 53.9597 32.6149 61.5572C34.7707 62.7947 39.8827 63.4189 44.9947 63.4189C50.1067 63.4189 55.2187 62.7947 57.3639 61.5572C58.3777 59.9968 59.2742 58.4579 60.0746 56.9191C59.5517 57.8338 58.986 58.7592 58.3777 59.6847L58.3884 59.6955Z"
        fill="url(#paint24_radial_2114_53138)"
      />
      <path
        d="M53.8103 16.2948H36.1797L44.995 23.139L53.8103 16.2948Z"
        fill="#FFC825"
      />
      <path
        style={{
          mixBlendMode: "screen",
        }}
        d="M53.8103 16.2948H36.1797L44.995 23.139L53.8103 16.2948Z"
        fill="url(#paint25_radial_2114_53138)"
      />
      <defs>
        <filter
          id="filter0_f_2114_53138"
          x="5.2832"
          y="6.2832"
          width="81.1318"
          height="81.1321"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="5"
            result="effect1_foregroundBlur_2114_53138"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2114_53138"
          x1="45"
          y1="1"
          x2="45"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D37200" />
          <stop offset="1" stop-color="#9F4300" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(69.2425 36.4616) scale(19.5836 19.747)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(30.8864 1.75637) scale(61.5469 62.0606)"
        >
          <stop offset="0.62" stop-color="white" />
          <stop offset="0.84" stop-color="#C77107" />
          <stop offset="0.87" stop-color="#D18B34" />
          <stop offset="0.94" stop-color="#EBCCA6" />
          <stop offset="1" stop-color="white" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(45.4007 45.0384) scale(25.9549 26.1715)"
        >
          <stop offset="0.66" stop-color="#808080" />
          <stop offset="0.68" stop-color="#858585" />
          <stop offset="0.7" stop-color="#949494" />
          <stop offset="0.72" stop-color="#AEAEAE" />
          <stop offset="0.75" stop-color="#D1D1D1" />
          <stop offset="0.78" stop-color="#F0F0F0" />
          <stop offset="0.8" stop-color="#CECECE" />
          <stop offset="0.81" stop-color="#B1B1B1" />
          <stop offset="0.83" stop-color="#9B9B9B" />
          <stop offset="0.85" stop-color="#8C8C8C" />
          <stop offset="0.87" stop-color="#828282" />
          <stop offset="0.91" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(42.8073 50.5805) scale(47.3528 47.748)"
        >
          <stop offset="0.62" stop-color="white" />
          <stop offset="0.84" stop-color="#C77107" />
          <stop offset="0.87" stop-color="#D18B34" />
          <stop offset="0.94" stop-color="#EBCCA6" />
          <stop offset="1" stop-color="white" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(69.2416 36.4605) scale(19.5836 19.747)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint6_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(46.6377 89.5784) scale(53.3186 53.7635)"
        >
          <stop offset="0.62" stop-color="white" />
          <stop offset="0.84" stop-color="#C77107" />
          <stop offset="0.87" stop-color="#D18B34" />
          <stop offset="0.94" stop-color="#EBCCA6" />
          <stop offset="1" stop-color="white" />
        </radialGradient>
        <radialGradient
          id="paint7_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(63.3291 80.3774) scale(25.8055 26.0209)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint8_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-14.4288 36.4607) scale(75.6236 76.2547)"
        >
          <stop offset="0.6" stop-color="white" />
          <stop offset="0.84" stop-color="#C77107" />
          <stop offset="0.87" stop-color="#D18B34" />
          <stop offset="0.94" stop-color="#EBCCA6" />
          <stop offset="1" stop-color="white" />
        </radialGradient>
        <radialGradient
          id="paint9_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(44.0878 77.6575) scale(21.7074 21.8885)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint10_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(33.0422 59.8583) scale(13.5111 13.6238)"
        >
          <stop stop-color="#FDFDFD" />
          <stop offset="0.18" stop-color="#B1B1B1" />
          <stop offset="0.35" stop-color="#727272" />
          <stop offset="0.5" stop-color="#414141" />
          <stop offset="0.63" stop-color="#1D1D1D" />
          <stop offset="0.74" stop-color="#070707" />
          <stop offset="0.81" />
        </radialGradient>
        <radialGradient
          id="paint11_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20.4702 70.8887) scale(17.3851 17.5302)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint12_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.4596 53.4123) scale(65.0901 65.6333)"
        >
          <stop offset="0.46" stop-color="white" />
          <stop offset="0.84" stop-color="#C78907" />
          <stop offset="0.87" stop-color="#D19E34" />
          <stop offset="0.94" stop-color="#EBD5A6" />
          <stop offset="1" stop-color="white" />
        </radialGradient>
        <radialGradient
          id="paint13_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(44.5682 43.372) scale(25.2079 25.4182)"
        >
          <stop offset="0.66" stop-color="#808080" />
          <stop offset="0.68" stop-color="#858585" />
          <stop offset="0.7" stop-color="#949494" />
          <stop offset="0.72" stop-color="#AEAEAE" />
          <stop offset="0.75" stop-color="#D1D1D1" />
          <stop offset="0.78" stop-color="#F0F0F0" />
          <stop offset="0.8" stop-color="#CECECE" />
          <stop offset="0.81" stop-color="#B1B1B1" />
          <stop offset="0.83" stop-color="#9B9B9B" />
          <stop offset="0.85" stop-color="#8C8C8C" />
          <stop offset="0.87" stop-color="#828282" />
          <stop offset="0.91" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint14_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(47.471 30.2001) scale(53.5107 53.9573)"
        >
          <stop offset="0.72" stop-color="white" />
          <stop offset="0.93" stop-color="#C77107" />
          <stop offset="0.94" stop-color="#D18B34" />
          <stop offset="0.98" stop-color="#EBCCA6" />
          <stop offset="1" stop-color="white" />
        </radialGradient>
        <radialGradient
          id="paint15_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(32.4659 58.8145) scale(10.9818 11.0734)"
        >
          <stop stop-color="#FDFDFD" />
          <stop offset="0.18" stop-color="#B1B1B1" />
          <stop offset="0.35" stop-color="#727272" />
          <stop offset="0.5" stop-color="#414141" />
          <stop offset="0.63" stop-color="#1D1D1D" />
          <stop offset="0.74" stop-color="#070707" />
          <stop offset="0.81" />
        </radialGradient>
        <radialGradient
          id="paint16_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(21.6545 48.696) scale(15.3574 15.4855)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint17_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(22.583 78.182) scale(30.5013 30.7559)"
        >
          <stop stop-color="white" />
          <stop offset="0.46" stop-color="#BEBEBE" />
          <stop offset="0.82" stop-color="#919191" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint18_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(48.3032 42.5297) scale(29.4768 29.7228)"
        >
          <stop offset="0.66" stop-color="#808080" />
          <stop offset="0.68" stop-color="#858585" />
          <stop offset="0.7" stop-color="#949494" />
          <stop offset="0.72" stop-color="#AEAEAE" />
          <stop offset="0.75" stop-color="#D1D1D1" />
          <stop offset="0.78" stop-color="#F0F0F0" />
          <stop offset="0.8" stop-color="#CECECE" />
          <stop offset="0.81" stop-color="#B1B1B1" />
          <stop offset="0.83" stop-color="#9B9B9B" />
          <stop offset="0.85" stop-color="#8C8C8C" />
          <stop offset="0.87" stop-color="#828282" />
          <stop offset="0.91" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint19_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(36.1581 83.7779) scale(31.2911 31.5522)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint20_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(33.0422 59.8547) scale(13.5111 13.6238)"
        >
          <stop stop-color="#FDFDFD" />
          <stop offset="0.18" stop-color="#B1B1B1" />
          <stop offset="0.35" stop-color="#727272" />
          <stop offset="0.5" stop-color="#414141" />
          <stop offset="0.63" stop-color="#1D1D1D" />
          <stop offset="0.74" stop-color="#070707" />
          <stop offset="0.81" />
        </radialGradient>
        <radialGradient
          id="paint21_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(41.4515 40.0232) scale(30.7895 31.0464)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint22_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(21.964 71.5981) scale(67.0004 67.5596)"
        >
          <stop offset="0.45" stop-color="white" />
          <stop offset="0.84" stop-color="#C78907" />
          <stop offset="0.87" stop-color="#D19E34" />
          <stop offset="0.94" stop-color="#EBD5A6" />
          <stop offset="1" stop-color="white" />
        </radialGradient>
        <radialGradient
          id="paint23_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(26.9373 67.2075) scale(31.163 31.4231)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#F8F8F8" />
          <stop offset="0.34" stop-color="#E5E5E5" />
          <stop offset="0.58" stop-color="#C6C6C6" />
          <stop offset="0.85" stop-color="#9B9B9B" />
          <stop offset="1" stop-color="#808080" />
        </radialGradient>
        <radialGradient
          id="paint24_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(31.505 65.3237) scale(28.2601 28.496)"
        >
          <stop stop-color="#FDFDFD" />
          <stop offset="0.18" stop-color="#B1B1B1" />
          <stop offset="0.35" stop-color="#727272" />
          <stop offset="0.5" stop-color="#414141" />
          <stop offset="0.63" stop-color="#1D1D1D" />
          <stop offset="0.74" stop-color="#070707" />
          <stop offset="0.81" />
        </radialGradient>
        <radialGradient
          id="paint25_radial_2114_53138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(47.8872 33.1255) scale(22.177 22.362)"
        >
          <stop stop-color="white" />
          <stop offset="0.14" stop-color="#FBFBFB" />
          <stop offset="0.26" stop-color="#EFEFEF" />
          <stop offset="0.39" stop-color="#DCDCDC" />
          <stop offset="0.51" stop-color="#C1C1C1" />
          <stop offset="0.63" stop-color="#9F9F9F" />
          <stop offset="0.75" stop-color="#747474" />
          <stop offset="0.87" stop-color="#424242" />
          <stop offset="0.98" stop-color="#090909" />
          <stop offset="1" />
        </radialGradient>
      </defs>
    </svg>
  );
};
