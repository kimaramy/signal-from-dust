import React from "react";

const SoundFilter = React.forwardRef<SVGFilterElement>(function SoundFilter(
  _,
  ref
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="invisible absolute h-px w-px"
    >
      <defs>
        <filter id="sound-filter" ref={ref}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.000001"
            numOctaves="1"
            result="warp"
          />
          <feOffset dx="0" dy="-90" result="warpOffset" />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="30"
            in="SourceGraphic"
            in2="warpOffset"
          />
        </filter>
      </defs>
    </svg>
  );
});

export default SoundFilter;
