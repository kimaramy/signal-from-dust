import type { NextTemplateProps } from '@/lib/router';
import Floating from '@/components/Floating';
import HomeButton from '@/components/HomeButton';

function Template({ children }: NextTemplateProps) {
  return (
    <>
      {children}
      <Floating direction="column" right={2} bottom={3}>
        <HomeButton />
      </Floating>
    </>
  );
}

export default Template;
