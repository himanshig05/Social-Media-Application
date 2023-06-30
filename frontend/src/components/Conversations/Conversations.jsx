import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import "./Conversations.css";

const Conversation = ({ conversation }) => {
  const loggedInUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  const friendId = conversation.members.find((m) => m !== loggedInUser._id);
  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${friendId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  
  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="conversation">
      <img className="conversationImg" src={user.picturePath} alt="" />
      <span className="conversationName">{user.firstName }</span>
    </div>
  );
}

export default Conversation