'use client';

import React from 'react';

export const bitNoiseId = 'bit-noise';

const BitNoise = React.memo(function BitNoise() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="invisible absolute h-px w-px"
        aria-hidden
      >
        <defs>
          <filter id={bitNoiseId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              result="warp"
            />
            <feOffset dx="0" dy="-100" result="warpOffset" />
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
      <style global jsx>
        {`
          .bit-noise {
            transform: translateZ(50%);
            width: 95%;
            height: 95%;
            position: absolute;
            top: 2.5%;
            left: 0;
            z-index: 0;
            outline: 100px solid transparent !important;
            transition: background 0.1s ease-out;
          }
        `}
      </style>
    </>
  );
});

export default BitNoise;
