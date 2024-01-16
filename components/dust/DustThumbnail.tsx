import React from 'react';
import Image, { type ImageProps } from 'next/image';

import { DustUtils } from '@/lib/model';

interface DustThumbnailProps extends Omit<ImageProps, 'src' | 'alt'> {
  dustGrade: DustUtils.GradeKey;
  fileSize: '360x360' | '540x540' | '1080x1080';
}

function DustThumbnail({
  dustGrade,
  fileSize,
  className,
  ...rest
}: DustThumbnailProps) {
  const fileName = `${dustGrade.toLowerCase()}-${fileSize}.webp`;
  return (
    <Image
      src={`https://ygpfckjmxgbewxkislyq.supabase.co/storage/v1/object/public/imgs/${fileName}`}
      alt={`Panoramic view of Seoul with ${dustGrade} weather`}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      placeholder="blur"
      className={className}
      {...rest}
    />
  );
}

export { DustThumbnail };
