function MessageBub({ item }) {
  return (
    <span className="text-[#C9184A] w-full font-semibold tracking-wide text-center message-float-in text-lg wrap-break-word">
      {item.text}
    </span>
  );
}

export default MessageBub;
