import { Box, Divider } from "@chakra-ui/react";
import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import Slider from "react-slick";
import "../assets/styles/Home.css";
import Footer from "../components/common/Footer";
import LoadingScreen from "../components/common/LoadingScreen";
import Navbar from "../components/common/Navbar";
import ContinentsList from "../components/home/ContinentsListMobile";
import InteractiveMap from "../components/home/InteractiveMap";
import OurMission from "../components/home/OurMission";
import OurMissionMobile from "../components/home/OurMissionMobile";
import useGetContinents from "../hooks/useGetContinents";
import { useNavigatePage } from "../hooks/useNavigatePage";
import { useWindowResize } from "../hooks/useWinowResize";
import { formatToSmallCaps } from "../models";

const Home = () => {
  const { isMobile, isLoading } = useWindowResize(768);
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();

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

  const { handleNavigate } = useNavigatePage({
    onNavigate: (page) => console.log(`Navigating to ${page}`),
    sliderRef,
    pages: ["explore", "mission"],
  });

  const { continents } = useGetContinents();

  const handleSelectContinent = (continentName: string) => {
    navigate(`/continents/${formatToSmallCaps(continentName)}`);
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
                <InteractiveMap continents={continents} />
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
