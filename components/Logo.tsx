'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === 'dark' ? '/thumb-dark.webp' : '/thumb.webp'}
      alt="logo"
      width="36"
      height="36"
      className="rounded-full border border-accent"
    />
  );
}
