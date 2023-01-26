import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const animationProps = useSpring({
    opacity: isHidden ? 0 : 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (scrollY > 100 && scrollY < 400) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <animated.div style={animationProps} className="navbar">
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
    </animated.div>
  );
};

export default Navbar;
