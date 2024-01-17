export const seoConfig = {
  title: 'Signal from dust',
  description: 'Signals and patterns found from PM10 and PM2.5 data',
  keywords: [
    'PM10',
    'PM2.5',
    'dust',
    'air pollution',
    'data visualization',
    'data sonification',
    'data art',
    'interative art',
  ],
  author: 'Haram Kim',
  links: {
    origin: 'https://signal-from-dust.vercel.app',
    ogImage:
      'https://ygpfckjmxgbewxkislyq.supabase.co/storage/v1/object/public/imgs/og.webp',
    github: 'https://github.com/kimaramy/signal-from-dust',
    repository: 'https://github.com/kimaramy/signal-from-dust',
    docs: 'https://github.com/kimaramy/signal-from-dust/blob/master/README.md',
  },
};

export type SeoConfig = typeof seoConfig;
