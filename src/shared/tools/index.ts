import { useUnit } from "effector-react";
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface checkPageClickingProps {
  blockDataId: string;
}

export const checkPageClicking = (
  { blockDataId }: checkPageClickingProps,
  callback: (isNotBlock: boolean) => void
) => {
  let isBlock = false;
  const clickEventHandler = (e: any) => {
    isBlock = e.target.closest(`[data-id="${blockDataId}"]`);
    callback(isBlock);
  };

  window.addEventListener("click", clickEventHandler);
};

type DeviceType = "main" | "bigTablet" | "laptop" | "tablet" | "phone";

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("main");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1280) {
        setDeviceType("main");
      } else if (width <= 996 && width > 700) {
        setDeviceType("bigTablet");
      } else if (width <= 1280 && width > 700) {
        setDeviceType("laptop");
      } else if (width <= 700 && width > 320) {
        setDeviceType("tablet");
      } else if (width <= 320) {
        setDeviceType("phone");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};
