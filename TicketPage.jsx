import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const session = location.state?.session;

  if (!session) return <p>Session not found.</p>;

  return (
    <div className="form-wrapper">
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "2rem",
          backgroundColor: "#ffffff",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2c3e50" }}>
          Ticket for {session.title}
        </h2>

        <p><strong>Speaker:</strong> {session.speaker}</p>
        <p><strong>Time:</strong> {session.time}</p>
        <p><strong>Location:</strong> {session.location}</p>
        <p><strong>Price:</strong> ${session.price || 0}</p>

        <button
          onClick={() => navigate(`/payment/${session.id}`, { state: { session } })}
          style={{
            display: "block",
            width: "100%",
            marginTop: "1.5rem",
            padding: "0.75rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default TicketPage;
