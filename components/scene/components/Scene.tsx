import SceneBody from './SceneBody';
import SceneHead from './SceneHead';
import SceneOverview from './SceneOverview';
import ScenePlayer from './ScenePlayer';
import SceneRoot from './SceneRoot';
import SceneScreen from './SceneScreen';

const Scene = Object.freeze({
  Root: SceneRoot,
  Head: SceneHead,
  Body: SceneBody,
  Screen: SceneScreen,
  Overview: SceneOverview,
  Player: ScenePlayer,
});

export default Scene;
