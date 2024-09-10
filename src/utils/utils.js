export function getFullYear() {
  return new Date().getFullYear();
}

export function getFooterCopy(isIndex) {
  return isIndex ? "VocaFlip main dashboard" : "VocaFlip";
}
