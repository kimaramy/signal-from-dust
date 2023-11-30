'use client';

import nprogress from 'nprogress';

type ProgressOptions = Parameters<typeof nprogress.configure>[0];

const progress = Object.freeze({
  start() {
    nprogress.start();
  },
  end() {
    nprogress.done();
  },
  config(options: ProgressOptions) {
    nprogress.configure(options);
  },
});

export type { ProgressOptions };

export default progress;
