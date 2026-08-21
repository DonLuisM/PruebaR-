export function buildMessageItem(text) {
  const len = text.length;
  const baseSize = len > 40 ? 16 : len > 20 ? 16 : 22;
  const maxLeft = len > 40 ? 40 : len > 20 ? 55 : 65;

  return {
    id: `${text}-${Date.now()}-${Math.random()}`,
    text,
    top: `${Math.random() * 62 + 12}%`,
    left: `${Math.random() * maxLeft + 5}%`,
    rotate: `${Math.random() * 24 - 12}deg`,
    size: `${baseSize + Math.random() * 4}px`,
  };
}
