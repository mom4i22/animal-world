import { useState, useEffect, RefObject } from "react";
import { useWindowResize } from "./useWinowResize";

interface UseNavigatePageParams {
  onNavigate?: (page: string) => void;
  sliderRef?: RefObject<any>;
  pages: string[];
}

export const useNavigatePage = ({
  onNavigate,
  sliderRef,
  pages,
}: UseNavigatePageParams) => {
  const { isMobile } = useWindowResize();
  const [activePage, setActivePage] = useState<string>(pages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setIsOpen(false);
    onNavigate?.(page);

    if (sliderRef?.current && !isMobile) {
      const pageIndex = pages.indexOf(page);
      if (pageIndex !== -1) {
        sliderRef.current.slickGoTo(pageIndex);
      }
    }
  };

  useEffect(() => {
    if (!isMobile && sliderRef?.current) {
      const pageIndex = pages.indexOf(activePage);
      if (
        pageIndex !== -1 &&
        sliderRef.current.innerSlider?.state.currentSlide !== pageIndex
      ) {
        sliderRef.current.slickGoTo(pageIndex);
      }
    }
  }, [isMobile, activePage, sliderRef, pages]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return {
    activePage,
    isOpen,
    handleNavigate,
    toggleMenu,
    setIsOpen,
  };
};
