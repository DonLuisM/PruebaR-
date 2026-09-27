function MessageBub({ item }) {
  return (
    <span className="text-[#C9184A] font-semibold tracking-wide text-center message-float-in text-lg">
      {item.text}
    </span>
  );
}

export default MessageBub;
