import "../../assets/styles/Navbar.css";
import { Image } from "@chakra-ui/react";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <a href="#explore">Explore</a>
        </li>
      </ul>
      <div className="navbar-logo">
        <Image src="/img/logo.png" alt="Logo image" height={70}></Image>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="#mission">Our Mission</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
