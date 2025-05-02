import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client"
import "./project.css";

const Project = () => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("// Write your code here...\n");
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState(
    "*No review yet. Click 'get-review' to generate a code review.*"
  );

  function handleUserMessage() {
    setMessages((prev) => {
        return [ ...prev, input ]
    })
    setInput("")
}

  useEffect(() => {
    io("http://localhost:3000")
  })

  return (
    <main className="project-main">
      <section className="project-section">
        <div className="chat">
          <div className="messages">
            {messages.map((message, index) => {
              return (
                <div className="message" key={index}>
                  <span>{message}</span>
                </div>
              );
            })}  
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="message to project..."
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
            />
            <button
              onClick={() => {
                handleUserMessage();
              }}
            >
              <i className="ri-send-plane-2-fill"></i>
            </button>
          </div>
        </div>

        <div className="code"></div>

        <div className="review"></div>
      </section>
    </main>
  );
};

export default Project;
