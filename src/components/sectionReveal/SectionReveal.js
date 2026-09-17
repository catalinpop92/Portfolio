import React, {useContext} from "react";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

// Match the original portfolio's one-second directional entrances.
export default function SectionReveal({
  children,
  direction = "bottom",
  distance = "48px",
  delay = 0
}) {
  const {reducedMotion} = useContext(StyleContext);
  if (reducedMotion) return children;
  return (
    <Fade
      {...{[direction]: true}}
      duration={1000}
      distance={distance}
      delay={delay}
      fraction={0.12}
    >
      {children}
    </Fade>
  );
}
