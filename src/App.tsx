import { useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import "./App.scss";

const data = [
  { id: 1, sent: true, text: "Hi, how are you?" },
  { id: 2, sent: false, text: "I'm fine thanks. What about you?" },
  {
    id: 3,
    sent: false,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti vero sapiente recusandae perspiciatis dolorem ad id debitis nostrum eos quo?",
  },
  {
    id: 4,
    sent: true,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti vero sapiente recusandae perspiciatis dolorem ad id debitis nostrum eos quo?",
  },
  {
    id: 5,
    sent: true,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti vero sapiente recusandae perspiciatis dolorem ad id debitis.",
  },
];

function App() {
  const [messages, setMessages] = useState(data);
  const [isSend, setIsSend] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleChange = (mes: string) => {
    if (mes.length > 0) {
      setIsSend(true);
    } else {
      setIsSend(false);
    }
  };

  const handleClick = () => {
    setIsShow(true);
  };

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
        <div className="chat__body">
          <div className="chat__messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.sent ? "chat__send-message" : "chat__receive-message"
                }`}
              >
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chat__footer">
          <input
            type="text"
            placeholder="Type message..."
            onChange={(e) => handleChange(e.target.value)}
          />
          {isSend ? <IoSend /> : <FaMicrophone />}
        </div>
      </div>
    </div>
  );
}

export default App;
