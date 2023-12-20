'use client';

import { Link } from '@/lib/router';
import { seoConfig } from '@/lib/seo';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetSubTitle,
  SheetTitle,
} from '@/components/ui/sheet';

import { Button } from '../ui/button';

function IntroSheetContent() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>미세먼지의 신호</SheetTitle>
        <Separator />
        <div className="space-y-2 py-4">
          <SheetSubTitle>
            통계 데이터로부터 찾아낸 미세먼지의 신호와 패턴
          </SheetSubTitle>
          <SheetDescription>
            우리는 자연 현상을 너무 과학적으로 해석해온 것이 아닐까? 이
            프로젝트는 미세먼지 현상을 자연이 주는 신호로 바라보는 관점에서
            시작한다. 그 방법으로 미세먼지 데이터를 2진 신호로 변환하고, 웹
            기술을 통해 시각과 청각적 요소로 표현한다. 이를 통해 체험자는 눈과
            귀를 통해 미세먼지의 패턴을 찾아가는 사색의 시간을 보내게 된다.
            최종적으로, 체험자가 데이터마다 각기 다른 신호가 발생하고 있음을
            인지하고, 자연이 어떤 메시지를 전달하고 있는지 발견해나가길
            기대해본다.
          </SheetDescription>
        </div>
        <div className="flex items-center justify-between">
          <ul className="divide flex h-auto items-center divide-x divide-border text-xs">
            {['김하람', '2023', '데이터시각화'].map((word) => (
              <li
                key={word}
                className="px-2 first:pl-0 first:pr-2 last:pl-2 last:pr-0"
              >
                {word}
              </li>
            ))}
          </ul>
          <div>
            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
              <Link href={seoConfig.links.github} target="_blank">
                <Icon.Github aria-hidden className="h-4 w-4" />
                <span className="sr-only">Gitub</span>
              </Link>
            </Button>
          </div>
        </div>
      </SheetHeader>
    </SheetContent>
  );
}

export default IntroSheetContent;
