import { useState, useEffect } from "react";

interface UseWindowResizeReturn {
  width: number;
  height: number;
  isMobile: boolean;
  isLoading: boolean;
}

export const useWindowResize = (
  mobileBreakpoint: number = 768
): UseWindowResizeReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState<
    Omit<UseWindowResizeReturn, "isLoading">
  >({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < mobileBreakpoint,
  });

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      setIsLoading(true);

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < mobileBreakpoint,
      });

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [mobileBreakpoint]);

  return { ...windowSize, isLoading };
};
