import "./FeedbackPage.css";


import React, { useState } from "react";

const FeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    event: "",
    session: "",
    comments: ""
  });

  const handleChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedbackData);
    alert("Thanks for your feedback!");
    setFeedbackData({ name: "", event: "", session: "", comments: "" });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Leave Feedback</h2>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={feedbackData.name}
          onChange={handleChange}
          required
        />

        <label>Event:</label>
        <select name="event" value={feedbackData.event} onChange={handleChange} required>
          <option value="">-- Select an Event --</option>
          <option value="Tech Summit 2025">Tech Summit 2025</option>
          <option value="Women in Computing">Women in Computing</option>
          <option value="Cybersecurity Workshop">Cybersecurity Workshop</option>
          <option value="Hackathon Code for Good">Hackathon Code for Good</option>
          <option value="Resume Workshop">Resume Workshop</option>
          <option value="Internship Prep">Internship Prep</option>
          <option value="JavaScript Crash Course">JavaScript Crash Course</option>
        </select>

        <label>Session (optional):</label>
        <input
          type="text"
          name="session"
          value={feedbackData.session}
          onChange={handleChange}
        />

        <label>Feedback:</label>
        <textarea
          name="comments"
          value={feedbackData.comments}
          onChange={handleChange}
          rows="4"
          required
          placeholder="Let us know how it went!"
        />

        <button
          type="submit"
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            width: "100%",
            backgroundColor: "#f39c12",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
