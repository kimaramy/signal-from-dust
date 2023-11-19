import Link from 'next/link';

import { siteConfig } from '@/lib/site';
import Logo from '@/components/Logo';

export interface MainNavProps {}

export default function MainNav({}: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
        <span className="inline-block font-bold">{siteConfig.title}</span>
      </Link>
    </div>
  );
}
