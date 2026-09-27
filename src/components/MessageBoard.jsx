import MessageBubble from "./MessageBub.jsx";

function MessageBoard({ displayedMessages }) {
  return (
    <div className="relative flex flex-col overflow-y-auto w-full items-center justify-center py-2 px-6">
      <div className="flex w-full flex-col items-center gap-4">
        {displayedMessages.map((item) => (
          <MessageBubble key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MessageBoard;
