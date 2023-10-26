'use client';

import React, { useEffect, useRef } from 'react';
// @ts-ignore
import pagemap from 'pagemap';

import { useCollectionValue } from '@/components/collection';

import { useDisplayValue } from './display';

function MiniMap() {
  const display = useDisplayValue();

  const collection = useCollectionValue();

  const canvasRef = useRef(null);

  useEffect(() => {
    if (display === '3d') {
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
  }, [display, collection]);

  if (display === '2d') return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute right-0 top-0 z-50 h-minimap"
      key={collection}
    ></canvas>
  );
}

export default React.memo(MiniMap);
