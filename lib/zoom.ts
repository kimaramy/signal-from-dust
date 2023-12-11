// @ts-nocheck

// 현재 줌 레벨을 가져오는 함수
function getCurrentZoomLevel() {
  return parseFloat(document.body.style.zoom) || 100;
}

// 화면을 지정된 비율로 확대하는 함수 (최대 150%)
export function zoomIn() {
  var currentZoomLevel = getCurrentZoomLevel();
  var newZoomLevel = Math.min(currentZoomLevel + 10, 130); // 10% 씩 확대
  document.body.style.zoom = newZoomLevel + '%';
}

// 화면을 지정된 비율로 축소하는 함수 (최소 100%)
export function zoomOut() {
  var currentZoomLevel = getCurrentZoomLevel();
  var newZoomLevel = Math.max(currentZoomLevel - 10, 100); // 10% 씩 축소
  document.body.style.zoom = newZoomLevel + '%';
}

// 원래 크기로 화면을 되돌리는 함수
export function resetZoom() {
  document.body.style.zoom = '100%';
}
