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
  const [deviceType, setDeviceType] = useState<DeviceType | undefined>(
    undefined
  );

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

export const FB_PIXEL_ID = "1797283080715437";

export const pageview = () => {
  (window as any).fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: any, options = {}) => {
  (window as any).fbq("track", name, options);
};
export const shortenAddress = (
  address: string | undefined,
  length = 4,
  ends = 4
) => {
  // console.log(address);
  if (!address) return "";
  return `${address.slice(0, 2 + length)}..${address.slice(
    -ends
  )}`.toLowerCase();
};

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
