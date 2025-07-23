// src/components/Session.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const Session = ({ sessions }) => {
  const navigate = useNavigate();

  const handleRegister = (session) => {
    navigate("/register", { state: { session } });
  };

  if (!sessions || sessions.length === 0) {
    return <p style={{ fontStyle: "italic" }}>No sessions available for this event.</p>;
  }

  return (
    <div style={{ marginTop: "15px", paddingLeft: "10px" }}>
      <h4>Sessions</h4>
      {sessions.map((session) => (
        <div
          key={session.id}
          style={{
            marginBottom: "10px",
            border: "1px solid #eee",
            borderRadius: "6px",
            padding: "10px"
          }}
        >
          <p><strong>{session.title}</strong></p>
          <p>🗣️ {session.speaker}</p>
          <p>🕒 {session.time}</p>
          <p>📍 {session.location}</p>

          <button
            onClick={() => handleRegister(session)}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Register
          </button>
        </div>
      ))}
    </div>
  );
};

export default Session;
