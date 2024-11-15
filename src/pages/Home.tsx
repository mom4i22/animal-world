import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
//@ts-ignore
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
  const navigate = useNavigate();

  const { handleNavigate } = useNavigatePage({
    onNavigate: (page) => console.log(`Navigating to ${page}`),
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
            <div className="desktop-container">
              <section id="mission" className="our-mission-section">
                <OurMission />
              </section>
              <section className="interactive-map-section">
                <InteractiveMap continents={continents} />
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(Home);
