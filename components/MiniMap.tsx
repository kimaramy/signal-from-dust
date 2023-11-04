'use client';

import React, { useEffect, useRef } from 'react';
// @ts-ignore
import pagemap from 'pagemap';

import { useDataCollectionKey } from '@/components/dataCollection';
import { useDisplayKey } from '@/components/display';

function MiniMap() {
  const displayKey = useDisplayKey();

  const dataCollectionKey = useDataCollectionKey();

  const canvasRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (displayKey === 'FULL') {
        pagemap(canvasRef.current, {
          viewport: document.getElementById('container'),
          styles: {
            'header,section,article': 'rgba(0, 0, 0, 0.08)',
            // 'h1,a': 'rgba(0, 0, 0, 0.10)',
            // 'h2,h3,h4': 'rgba(0, 0, 0, 0.08)',
          },
          back: 'rgba(0, 0, 0, 0.02)',
          view: 'rgba(0, 0, 0, 0.05)',
          drag: 'rgba(0, 0, 0, 0.10)',
          interval: null,
        });
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [displayKey, dataCollectionKey]);

  if (displayKey === 'AUTO') return null;

  return (
    <canvas
      key={dataCollectionKey}
      ref={canvasRef}
      className="absolute right-0 top-0 z-50 h-screen"
    ></canvas>
  );
}

export default React.memo(MiniMap);
