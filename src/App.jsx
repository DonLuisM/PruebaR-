import { useState } from "react";
import "./index.css";
import { messages } from "./data/List.jsx";
import { buildMessageItem } from "./utils/StyleMsg.jsx";
import RevealButton from "./components/Button.jsx";
import ResetButton from "./components/ResetButton.jsx";
import MessageBoard from "./components/MessageBoard.jsx";
import IsMobile from "./utils/IsMobile.jsx";

const MAX_VISIBLE = 8;

function App() {
  const [remainingMessages, setRemainingMessages] = useState(messages);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  const isMobile = IsMobile(440);
  const showResetButton = displayedMessages.length >= MAX_VISIBLE;
  const listMode = showResetButton || isMobile;

  const revealRandomMessage = () => {
    if (remainingMessages.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remainingMessages.length);
    const selectedMessage = remainingMessages[randomIndex];

    setDisplayedMessages((prev) => [
      ...prev,
      buildMessageItem(selectedMessage),
    ]);

    setRemainingMessages((prev) =>
      prev.filter((_, index) => index !== randomIndex),
    );
  };

  const handleMainClick = () => {
    if (displayedMessages.length >= MAX_VISIBLE) return;
    revealRandomMessage();
  };

  const resetMessages = () => {
    setRemainingMessages(messages);
    setDisplayedMessages([]);
  };

  return (
    <>
      <div className="flex box-border h-screen w-screen items-center justify-center font-sans m-0 bg-[#fff0f3]">
        <div className="flex flex-col box-border h-screen w-screen items-center justify-center font-sans m-0 overflow-hidden">
          {!showResetButton && <RevealButton onClick={handleMainClick} />}

          <MessageBoard
            displayedMessages={displayedMessages}
            listMode={listMode}
          />

          {showResetButton && <ResetButton onClick={resetMessages} />}
        </div>
      </div>
    </>
  );
}

export default App;
