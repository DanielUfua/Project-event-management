import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const session = location.state?.session;

  return (
    <div className="form-wrapper">
      <div style={{
        width: "100%",
        maxWidth: "600px",
        padding: "2rem",
        backgroundColor: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}>
        <h2>🎉 Payment Successful!</h2>
        <p>You have successfully registered and paid for:</p>
        <p><strong>{session?.title}</strong></p>
        <p>We look forward to seeing you at the event!</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
