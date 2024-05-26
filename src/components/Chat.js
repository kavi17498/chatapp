import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt", "desc") // Order messages by createdAt in descending order
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(fetchedMessages.reverse()); // Reverse the array to display newest messages on top
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");  // Clear the input field after sending the message
  };

  return (
    <div className="chat-app">
      <div className="header">
        Welcome to {room};
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="message-user">{message.user}: </span>
            <span className="message-text">{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type Your Message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};
