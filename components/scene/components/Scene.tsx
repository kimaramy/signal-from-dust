import SceneBody from './SceneBody';
import SceneCard from './SceneCard';
import SceneHead from './SceneHead';
import SceneOverview from './SceneOverview';
import ScenePlayer from './ScenePlayer';
import SceneRank from './SceneRank';
import SceneRoot from './SceneRoot';
import SceneTypography from './SceneTypography';
import SceneValue from './SceneValue';

const Scene = Object.freeze({
  Root: SceneRoot,
  Head: SceneHead,
  Body: SceneBody,
  Overview: SceneOverview,
  Card: SceneCard,
  Value: SceneValue,
  Rank: SceneRank,
  Player: ScenePlayer,
  ...SceneTypography,
});

export default Scene;
