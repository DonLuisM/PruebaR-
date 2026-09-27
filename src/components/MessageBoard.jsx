import MessageBubble from "./MessageBub.jsx";

function MessageBoard({ displayedMessages }) {
  return (
    <div className="relative flex flex-col w-full items-center justify-center gap-4 px-6">
      {displayedMessages.map((item) => (
        <MessageBubble key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MessageBoard;
