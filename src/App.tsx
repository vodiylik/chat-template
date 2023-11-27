import { FormEvent, useEffect, useRef, useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import "./App.scss";

const data = [
  { sent: true, text: "Hi, how are you?" },
  { sent: false, text: "I'm fine thanks. What about you?" },
  {
    sent: false,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti vero sapiente recusandae perspiciatis dolorem ad id debitis nostrum eos quo?",
  },
  {
    sent: true,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti vero sapiente recusandae perspiciatis dolorem ad id debitis nostrum eos quo?",
  },
  {
    sent: true,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti vero sapiente recusandae perspiciatis dolorem ad id debitis.",
  },
];

function App() {
  const [messages, setMessages] = useState(data);
  const [text, setText] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (mes: string) => {
    setText(mes);
    if (mes.length > 0) {
      setIsSend(true);
    } else {
      setIsSend(false);
    }
  };

  const handleClick = () => {
    setIsShow(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (text.length > 0) {
      setMessages([...messages, { sent: true, text: text }]);
      setIsSend(false);
      setText("");
    }
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop =
        bodyRef.current.scrollHeight - bodyRef.current.clientHeight;
    }
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__icon" onClick={handleClick}>
        <BsChatDotsFill />
      </div>
      <div className={`chat__container ${isShow ? "show" : ""}`}>
        <div className="chat__header">
          <p>Chat</p>
          <IoClose onClick={() => setIsShow(false)} />
        </div>
        <div className="chat__body" ref={bodyRef}>
          <div className="chat__messages">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.sent
                      ? "chat__send-message"
                      : "chat__receive-message"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              ))
            ) : (
              <p className="chat__no-message">No messages yet</p>
            )}
          </div>
        </div>
        <div className="chat__footer">
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={text}
              type="text"
              placeholder="Type message..."
              onChange={(e) => handleChange(e.target.value)}
            />
            {isSend ? (
              <button type="submit" onClick={handleSubmit}>
                <IoSend />
              </button>
            ) : (
              <button type="submit">
                <FaMicrophone />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
