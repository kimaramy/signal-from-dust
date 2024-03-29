'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import { project } from '@/lib/project';
import { GithubLink } from '@/components/ui/links';
import { Separator } from '@/components/ui/separator';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetSubTitle,
  SheetTitle,
} from '@/components/ui/sheet';

import BookLink from '../BookLink';

function IntroSheetContent() {
  const {
    dictionary: { intro },
  } = useLocaleDictionary();

  return (
    <SheetContent className="overflow-x-hidden p-0 pr-safe pb-safe">
      <SheetHeader className="h-full p-6">
        <SheetTitle>{intro.content.title}</SheetTitle>
        <Separator />
        <div className="space-y-2 py-4">
          <SheetSubTitle>{intro.content.subtitle}</SheetSubTitle>
          <SheetDescription>{intro.content.description}</SheetDescription>
          <div>
            <BookLink variant="text" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ul className="divide flex h-auto items-center divide-x divide-border text-xs">
            {[intro.content.author, intro.content.year, intro.content.type].map(
              (word) => (
                <li
                  key={word}
                  className="px-2 first:pl-0 first:pr-2 last:pl-2 last:pr-0"
                >
                  {word}
                </li>
              )
            )}
          </ul>
          <div>
            <GithubLink href={project.url.repo} className="h-8 w-8" />
          </div>
        </div>
      </SheetHeader>
    </SheetContent>
  );
}

export default IntroSheetContent;
