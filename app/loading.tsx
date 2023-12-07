import FakeDataset from '@/components/FakeDataset';

/**
 * 같은 레벨의 layout내 페이지들에 대해 Suspense Fallback으로 래핑함
 */
function Loading() {
  return <FakeDataset />;
}

export default Loading;
