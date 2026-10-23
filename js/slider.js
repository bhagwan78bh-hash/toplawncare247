/* ==========================================================================
   TOPLAWNCARE247 - INTERACTIVE BEFORE & AFTER COMPARISON SLIDER
   ========================================================================== */

export function initComparisonSlider() {
  const container = document.querySelector('.slider-container');
  const beforeLayer = document.querySelector('.slider-image-layer.before-layer');
  const beforeImage = beforeLayer ? beforeLayer.querySelector('img') : null;
  const handleBar = document.querySelector('.slider-handle-bar');

  if (!container || !beforeLayer || !handleBar) return;

  let isDragging = false;
  let containerRect = container.getBoundingClientRect();

  function updateContainerRect() {
    containerRect = container.getBoundingClientRect();
    if (beforeImage) {
      beforeImage.style.width = `${containerRect.width}px`;
    }
  }

  // Update image width to match container width on resize
  window.addEventListener('resize', updateContainerRect);
  updateContainerRect();

  function setSliderPosition(x) {
    const minX = 0;
    const maxX = containerRect.width;
    const boundedX = Math.max(minX, Math.min(x, maxX));
    const percentage = (boundedX / maxX) * 100;

    beforeLayer.style.width = `${percentage}%`;
    handleBar.style.left = `${percentage}%`;
    handleBar.setAttribute('aria-valuenow', Math.round(percentage));
  }

  function handleMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - containerRect.left;
    setSliderPosition(offsetX);
  }

  function startDragging(e) {
    isDragging = true;
    updateContainerRect();
    handleMove(e);
    document.body.style.cursor = 'ew-resize';
  }

  function stopDragging() {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = '';
    }
  }

  // Mouse & Touch Listeners
  handleBar.addEventListener('mousedown', startDragging);
  container.addEventListener('mousedown', startDragging);
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', stopDragging);

  handleBar.addEventListener('touchstart', startDragging, { passive: true });
  container.addEventListener('touchstart', startDragging, { passive: true });
  window.addEventListener('touchmove', handleMove, { passive: true });
  window.addEventListener('touchend', stopDragging);

  // Keyboard controls on handleBar
  handleBar.setAttribute('tabindex', '0');
  handleBar.setAttribute('role', 'slider');
  handleBar.setAttribute('aria-label', 'Compare lawn before and after treatment');
  handleBar.setAttribute('aria-valuemin', '0');
  handleBar.setAttribute('aria-valuemax', '100');
  handleBar.setAttribute('aria-valuenow', '50');

  handleBar.addEventListener('keydown', (e) => {
    const currentPercent = parseFloat(beforeLayer.style.width) || 50;
    if (e.key === 'ArrowLeft') {
      const nextVal = Math.max(0, currentPercent - 5);
      beforeLayer.style.width = `${nextVal}%`;
      handleBar.style.left = `${nextVal}%`;
      handleBar.setAttribute('aria-valuenow', Math.round(nextVal));
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      const nextVal = Math.min(100, currentPercent + 5);
      beforeLayer.style.width = `${nextVal}%`;
      handleBar.style.left = `${nextVal}%`;
      handleBar.setAttribute('aria-valuenow', Math.round(nextVal));
      e.preventDefault();
    }
  });

  // Default initial position at 50%
  setSliderPosition(containerRect.width * 0.5);
}
