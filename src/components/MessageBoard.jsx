import MessageBubble from "./MessageBub.jsx";

function MessageBoard({ displayedMessages, listMode }) {
  const containerClass = listMode
    ? "relative flex flex-col w-full items-center justify-center gap-4 px-6"
    : "relative flex h-screen w-full items-center justify-center";

  return (
    <div className={containerClass}>
      {displayedMessages.map((item) => (
        <MessageBubble key={item.id} item={item} listMode={listMode} />
      ))}
    </div>
  );
}

export default MessageBoard;
