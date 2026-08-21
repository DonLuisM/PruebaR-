function MessageBub({ item, listMode }) {
  const className = listMode
    ? "text-[#C9184A] font-semibold tracking-wide text-center message-float-in"
    : "absolute z-10 whitespace-nowrap select-none text-[#C9184A] font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(201,24,78,0.2)] message-float-in transition-transform duration-300 hover:scale-110";

  const style = listMode
    ? { fontSize: "18px" }
    : {
        top: item.top,
        left: item.left,
        fontSize: item.size,
        "--rotate": item.rotate,
        transform: `rotate(${item.rotate})`,
      };

  return (
    <span className={className} style={style}>
      {item.text}
    </span>
  );
}

export default MessageBub;
