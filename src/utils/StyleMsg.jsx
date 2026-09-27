export function buildMessageItem(text) {
  return {
    id: `${text}-${Date.now()}-${Math.random()}`,
    text,
  };
}
