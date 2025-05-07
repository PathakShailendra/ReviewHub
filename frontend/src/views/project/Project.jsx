import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io as SocketIo } from "socket.io-client";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import "./project.css";

const Project = () => {
  const prams = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("// Write your code here...\n");
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState(
    "*No review yet. Click 'get-review' to generate a code review.*"
  );
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [codeCopySuccess, setCodeCopySuccess] = useState(false);

  function handleEditorChange(value) {
    setCode(value);
    socket.emit("code-change", value);
  }

  function handleUserMessage() {
    if (input.trim() === "") return;

    // Add the message with a type to indicate it's from the current user
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Only emit the text content to the socket
    socket.emit("chat-message", input);
    setInput("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleUserMessage();
    }
  }

  function getReview() {
    setLoading(true);
    socket.emit("get-review", code);
  }

  function changeLanguage(newLanguage) {
    setLanguage(newLanguage);
  }

  function copyCodeToClipboard() {
    // Extract code blocks from the review
    const codeRegex = /`(?:.*?)\n([\s\S]*?)`/g;
    let match;
    let suggestedCode = "";

    while ((match = codeRegex.exec(review)) !== null) {
      suggestedCode += match[1] + "\n\n";
    }

    if (suggestedCode) {
      navigator.clipboard.writeText(suggestedCode.trim())
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  }

  // New function to copy editor code to clipboard
  function copyEditorCode() {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCodeCopySuccess(true);
        setTimeout(() => setCodeCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy editor code: ', err);
      });
  }

  // New function to clear editor code
  function clearEditorCode() {
    const emptyCode = "// Write your code here...\n";
    setCode(emptyCode);
    socket.emit("code-change", emptyCode);
  }

  useEffect(() => {
    const io = SocketIo("http://localhost:3000", {
      query: {
        project: prams.id,
      },
    });

    io.emit("chat-history");

    // Handle chat history from server
    io.on("chat-history", (historyMessages) => {
      // Convert the history messages to our format with isUser property
      const formattedMessages = historyMessages.map(msg => {
        // If the message is an object with an isUser property, preserve that
        if (typeof msg === 'object' && msg !== null) {
          return msg;
        }
        // Otherwise, assume it's a string from another user
        return { text: msg.text || msg, isUser: false };
      });
      setMessages(formattedMessages);
    });

    // Handle incoming messages from other users
    io.on("chat-message", (message) => {
      // Check if the message is already an object with isUser property
      // This prevents duplicate messages
      if (typeof message === 'object' && message.hasOwnProperty('isUser')) {
        return; // Skip if it's our own message being echoed back
      }
      
      // Add as a message from another user
      setMessages(prev => [...prev, { text: message, isUser: false }]);
    });

    io.on("code-change", (code) => {
      setCode(code);
    });

    io.on("project-code", (code) => {
      setCode(code);
    });

    io.on("code-review", (review) => {
      setLoading(false);
      setReview(review);
    });

    io.emit("get-project-code");

    setSocket(io);

    return () => {
      io.disconnect();
    };
  }, [prams.id]);

  return (
    <main className="project-main">
      <section className="project-section">
        <div className="chat">
          <div className="section-header">
            <h2>Chat</h2>
          </div>
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isUser ? "user-message" : "other-message"}`}
              >
                {message.text || message}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder="Type a message..."
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleUserMessage}
              className="send-button"
            >
              <i className="ri-send-plane-2-fill"></i>
            </button>
          </div>
        </div>

        <div className="code">
          <div className="section-header">
            <h2>Code</h2>
          </div>
          <div className="code-editor-header">
            <div className="language-selector">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>
            <div className="code-editor-buttons">
              <button 
                onClick={copyEditorCode}
                className={`code-editor-button ${codeCopySuccess ? 'copy-success' : ''}`}
              >
                {codeCopySuccess ? "Copied!" : "Copy"}
              </button>
              <button 
                onClick={clearEditorCode}
                className="code-editor-button clear-button"
              >
                Clear
              </button>
            </div>
          </div>
          <Editor
            height="90%"
            width="100%"
            language={language}
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              wordWrap: "on",
              automaticLayout: true,
              formatOnType: true,
              formatOnPaste: true,
              cursorBlinking: "smooth",
            }}
          />
        </div>

        <div className="review">
          <div className="section-header">
            <h2>Code Review</h2>
            <div className="review-buttons">
              <button
                onClick={getReview}
                className="get-review"
                disabled={loading}
              >
                {loading ? "Loading..." : "get-review"}
              </button>
              <button
                onClick={copyCodeToClipboard}
                className={`copy-code ${copySuccess ? 'copy-success' : ''}`}
              >
                {copySuccess ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
          <div className="review-content">
            <ReactMarkdown>{review}</ReactMarkdown>
          </div>
          {loading && (
            <div className="review-loader">
              <div className="loader-spinner"></div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Project;