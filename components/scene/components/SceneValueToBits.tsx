import { Icon } from '@/lib/icon';

import SceneBits from './SceneBits';
import SceneValue from './SceneValue';

function SceneValueToBits() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <SceneValue />
      <Icon.ArrowRight aria-hidden className="h-4 w-4" />
      <SceneBits />
    </div>
  );
}

export default SceneValueToBits;
