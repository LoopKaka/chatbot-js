import { useState } from "react";
import MessageRow from "./MessageRow";

const Container = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isDisabled, setDisable] = useState(false);

  const BASE_URL = "https://chatbot-js-navy.vercel.app";

  const callAPI = async () => {
    try {
      const response = await fetch(BASE_URL + "/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: inputValue }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setDisable(false);
    }
  };

  const handleSendBtn = async () => {
    if (!inputValue) return;

    setDisable(true);

    const userMsg = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    await callAPI();
  };

  const renderMessages = () => {
    return messages.map((msgObj, index) => {
      return <MessageRow {...msgObj} key={index} />;
    });
  };

  return (
    <div className="center-wrap">
      <div className="chat-panel" role="application" aria-label="Chatbox">
        <div className="chat-header">
          <div className="avatar">AI</div>
          <div className="header-title">
            <div className="title">LoopKaka Assistant</div>
            <div className="subtitle">Say hi — I'll help you out</div>
          </div>
        </div>

        <div id="chatBody" className="chat-body" aria-live="polite">
          {renderMessages()}
        </div>

        <div className="chat-input">
          <div className="input-box" role="search">
            <input
              id="chatInput"
              type="text"
              placeholder="Type your message..."
              aria-label="Type your message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button
            id="sendBtn"
            className="btn-send"
            aria-label="Send message"
            onClick={() => handleSendBtn()}
            disabled={!inputValue || isDisabled}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Container;
