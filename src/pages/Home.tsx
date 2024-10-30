import { useRef, useMemo } from "react";
//@ts-ignore
import Slider from "react-slick";
import InteractiveMap from "../components/home/InteractiveMap";
import Navbar from "../components/common/Navbar";
import OurMission from "../components/home/OurMission";
import "../assets/styles/Home.css";
import OurMissionMobile from "../components/home/OurMissionMobile";
import ContinentsList from "../components/home/ContinentsListMobile";
import Footer from "../components/common/Footer";
import { Box, Divider } from "@chakra-ui/react";
import { useWindowResize } from "../hooks/useWinowResize";
import { useNavigatePage } from "../hooks/useNavigatePage";
import LoadingScreen from "../components/common/LoadingScreen";
import React from "react";

const Home = () => {
  const { isMobile, isLoading } = useWindowResize(768);
  const sliderRef = useRef<Slider | null>(null);

  // Memoize the slider settings to avoid reinitialization
  const settings = useMemo(
    () => ({
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      swipe: false,
      draggable: false,
      touchMove: false,
    }),
    []
  );

  // Memoize handleNavigate to avoid redundant recalculations
  const { handleNavigate } = useNavigatePage({
    onNavigate: (page) => console.log(`Navigating to ${page}`),
    sliderRef,
    pages: ["explore", "mission"],
  });

  // Define continents array as a memoized constant to prevent reinitialization
  const continents = useMemo(
    () => [
      {
        name: "Africa",
        description: "Africa is known for its diverse ecosystems and wildlife.",
        imageUrl: "/img/africa_cover.jpg",
      },
      {
        name: "Asia",
        description:
          "Asia is the largest continent with rich cultural heritage.",
        imageUrl: "/img/asia_cover.jpg",
      },
    ],
    []
  );

  const handleSelectContinent = (continentName: string) => {
    console.log(`Selected continent: ${continentName}`);
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} />

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {isMobile ? (
            <div className="mobile-container">
              <section id="mission">
                <OurMissionMobile />
              </section>
              <Box py={5} my={5}>
                <Divider color="yellow" borderWidth={2} />
              </Box>
              <section id="explore">
                <ContinentsList
                  continents={continents}
                  onSelectContinent={handleSelectContinent}
                />
              </section>
              <footer className="footer-class">
                <Footer color="white" />
              </footer>
            </div>
          ) : (
            <Slider
              {...settings}
              ref={sliderRef}
              className="carousel-container"
            >
              <section className="interactive-map-section">
                <InteractiveMap />
              </section>
              <section className="our-mission-section">
                <OurMission />
              </section>
            </Slider>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(Home);
