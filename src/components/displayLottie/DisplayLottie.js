import React, {useEffect, useRef} from "react";
import Lottie from "lottie-react";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function DisplayLottie({animationData}) {
  const animation = useRef(null);
  const container = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) {
      animation.current?.goToAndStop(0, true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      animation.current?.play();
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry =>
        entry.isIntersecting
          ? animation.current?.play()
          : animation.current?.pause()
      );
    });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, [reducedMotion]);
  return (
    <div ref={container} aria-hidden="true">
      <Lottie
        lottieRef={animation}
        animationData={animationData}
        loop={!reducedMotion}
        autoplay={false}
      />
    </div>
  );
}
