import InteractiveMap from "../components/common/InteractiveMap";
import Navbar from "../components/common/Navbar";
import OurMission from "../components/home/OurMission";
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="interactive-map-section">
        <InteractiveMap />
      </section>
      <section className="our-mission-section">
        <OurMission />
      </section>
    </>
  );
};

export default Home;
