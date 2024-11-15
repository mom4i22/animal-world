import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowResize } from "./useWinowResize";

interface UseNavigatePageParams {
  onNavigate?: (page: string) => void;
}

export const useNavigatePage = ({ onNavigate }: UseNavigatePageParams) => {
  const sections: string[] = ["explore", "mission"];
  const { isMobile } = useWindowResize();
  const navigate = useNavigate();
  const location = useLocation();

  const [activePage, setActivePage] = useState<string>("mission");
  const [isOpen, setIsOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setIsOpen(false);
    onNavigate?.(page);
    navigate(`/#${page}`);
    scrollToSection(page);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goBack = () => {
    if (location.pathname.startsWith("/continents/")) {
      navigate(`/#mission`);
      setActivePage("mission");
      scrollToSection("mission");
    } else {
      navigate(-1);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const isContinentRoute = (path: string) => path.startsWith("/continents/");

  useEffect(() => {
    if (initialLoad) {
      if (!location.hash && !isContinentRoute(location.pathname)) {
        navigate("/#mission", { replace: true });
        setActivePage("mission");
      }
      setInitialLoad(false);
    }
  }, [location, navigate, initialLoad]);

  useEffect(() => {
    if (!initialLoad) {
      const currentHash = location.hash.replace("#", "");
      if (isContinentRoute(location.pathname)) {
        setActivePage("");
      } else if (sections.includes(currentHash)) {
        setActivePage(currentHash);
        scrollToSection(currentHash);
      }
    }
  }, [location, sections, initialLoad]);

  return {
    activePage,
    isOpen,
    handleNavigate,
    toggleMenu,
    setIsOpen,
    isMobile,
    goBack,
  };
};
