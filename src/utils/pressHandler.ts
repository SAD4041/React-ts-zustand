export function handlePressHold(
  element: HTMLElement,
  onShortPress: () => void,
  onLongPress: () => void,
  holdThreshold = 600 // milliseconds
) {
  let holdTimer: ReturnType<typeof setTimeout> | null = null;
  let isHolding = false;

  // When the press starts
  const startPress = () => {
    holdTimer = setTimeout(() => {
      isHolding = true;
      element.classList.add("holding"); // 👈 Add your style trigger class
      onLongPress();
    }, holdThreshold);
  };

  // When the press ends
  const endPress = () => {
    if (holdTimer) clearTimeout(holdTimer);
    if (!isHolding) {
      onShortPress();
    } else {
      // Remove holding style after releasing
      element.classList.remove("holding");
      isHolding = false;
    }
  };

  // 🖱️ Desktop events
  element.addEventListener("mousedown", startPress);
  element.addEventListener("mouseup", endPress);
  element.addEventListener("mouseleave", endPress);

  // 📱 Mobile events
  element.addEventListener("touchstart", startPress);
  element.addEventListener("touchend", endPress);
  element.addEventListener("touchcancel", endPress);
}
