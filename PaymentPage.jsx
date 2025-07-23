import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const session = location.state?.session;

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    const { name, cardNumber, expiry, cvv } = formData;

    // Simple validations
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Card number must be 16 digits.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Expiration date must be in MM/YY format.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be exactly 3 digits.");
      return;
    }

    // Proceed to confirmation if all valid
    navigate("/confirmation", { state: { session } });
  };

  if (!session) return <p>Session not found.</p>;

  return (
    <div className="form-wrapper">
      <form onSubmit={handlePayment}>
        <h2>Payment for {session.title}</h2>

        <label>Cardholder Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          maxLength="16"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />

        <label>Expiration Date:</label>
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={formData.expiry}
          onChange={handleChange}
          required
        />

        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          maxLength="3"
          value={formData.cvv}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
