'use client';

import { useEffect } from 'react';

import progress, { type ProgressOptions } from '../progress';

interface ProgressProps extends ProgressOptions {
  color?: string;
}

/**
 * https://github.com/apal21/nextjs-progressbar/issues/86#issuecomment-1447977706
 */
function Progress(props: ProgressProps) {
  const { color = '#fdc741', ...options } = props;

  const styles = (
    <style>
      {`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: ${color};
          background-attachment: fixed;
          position: fixed;
          z-index: 99999;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1.0;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }
    `}
    </style>
  );

  useEffect(() => {
    progress.config({ showSpinner: false, ...options });
  }, [options]);

  return styles;
}

export default Progress;
