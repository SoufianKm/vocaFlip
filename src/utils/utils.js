export function getFullYear() {
  return new Date().getFullYear();
}

export function getFooterCopy(isIndex) {
  return isIndex ? "VocaFlip main dashboard" : "VocaFlip";
}

// Initialize state for each carousel
export const initializeCarouselState = (
  setIsDragging,
  setStartX,
  setScrollLeft,
  index
) => {
  setIsDragging((prev) => {
    const newArr = [...prev];
    newArr[index] = false;
    return newArr;
  });
  setStartX((prev) => {
    const newArr = [...prev];
    newArr[index] = 0;
    return newArr;
  });
  setScrollLeft((prev) => {
    const newArr = [...prev];
    newArr[index] = 0;
    return newArr;
  });
};

// Handle mouse down event for each carousel
export const handleMouseDown = (
  e,
  index,
  carouselRefs,
  setIsDragging,
  setStartX,
  setScrollLeft,
  initializeCarouselState
) => {
  initializeCarouselState(setIsDragging, setStartX, setScrollLeft, index); // Initialize state if it's not set
  setIsDragging((prev) => {
    const newArr = [...prev];
    newArr[index] = true;
    return newArr;
  });
  setStartX((prev) => {
    const newArr = [...prev];
    newArr[index] = e.pageX - carouselRefs.current[index].offsetLeft;
    return newArr;
  });
  setScrollLeft((prev) => {
    const newArr = [...prev];
    newArr[index] = carouselRefs.current[index].scrollLeft;
    return newArr;
  });
};

// Handle mouse move event for each carousel
export const handleMouseMove = (
  e,
  index,
  isDragging,
  startX,
  carouselRefs,
  scrollLeft
) => {
  if (!isDragging[index]) return; // Only move when dragging is active for the specific carousel
  const x = e.pageX - carouselRefs.current[index].offsetLeft;
  const walk = (x - startX[index]) * 2; // Adjust scroll speed
  carouselRefs.current[index].scrollLeft = scrollLeft[index] - walk;
};

// Handle mouse up event for each carousel
export const handleMouseUp = (setIsDragging, index) => {
  setIsDragging((prev) => {
    const newArr = [...prev];
    newArr[index] = false;
    return newArr;
  });
};

// Handle mouse leave event for each carousel
export const handleMouseLeave = (setIsDragging, index) => {
  setIsDragging((prev) => {
    const newArr = [...prev];
    newArr[index] = false;
    return newArr;
  });
};
