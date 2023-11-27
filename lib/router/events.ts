'use client';

import nprogress from 'nprogress';

function start() {
  nprogress.start();
}

function finish() {
  nprogress.done();
}

export { start, finish };
