import React from 'react';
import Image, { type ImageProps } from 'next/image';

import { DustUtils } from '@/lib/model';

type DustThumbnailName = Lowercase<DustUtils.GradeKey>;

interface DustThumbnailProps extends Omit<ImageProps, 'src' | 'alt'> {
  name: DustThumbnailName;
  size: '360' | '540' | '1080';
}

function DustThumbnail({ name, size, className, ...rest }: DustThumbnailProps) {
  return (
    <Image
      src={`https://ygpfckjmxgbewxkislyq.supabase.co/storage/v1/object/public/imgs/${name}-${size}x${size}.webp`}
      alt={`Panoramic view of Seoul with ${name} weather`}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      placeholder="blur"
      className={className}
      {...rest}
    />
  );
}

export { DustThumbnail, type DustThumbnailName };
