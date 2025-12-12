import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./chat.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto scroll ke bawah tiap ada pesan baru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    // Tampilkan pesan user
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    setLoading(true);

    try {
      // Kirim pertanyaan ke backend
      const { data } = await axios.post("http://localhost:5000/api/chat", {
        question: userMessage,
      });

      // Tambahkan jawaban bot
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Terjadi kesalahan saat menghubungkan ke server. Pastikan backend berjalan.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Helpdesk Validasi Absen & Tunkin</h2>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`bubble ${msg.from === "user" ? "user" : "bot"}`}
          >
            {msg.text.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ))}

        {/* Indicator loading */}
        {loading && (
          <div className="bubble bot typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Tanyakan sesuatu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Kirim</button>
      </div>
    </div>
  );
};

export default ChatPage;
