import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RegisterForm.css";

// Hardcoded default events
const defaultEvents = [
  { id: 1, name: "Tech Summit 2025" },
  { id: 2, name: "Women in Computing Conference" },
  { id: 3, name: "Cybersecurity Awareness Workshop" },
  { id: 4, name: "Hackathon Code for Good" },
  { id: 5, name: "Resume & LinkedIn Workshop" },
  { id: 6, name: "Internship Prep Workshop" },
  { id: 7, name: "JavaScript Crash Course" }
];

function RegisterForm() {
  const location = useLocation();
  const session = location.state?.session;
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
    sessionTitle: ""
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const mergedEvents = [...defaultEvents, ...storedEvents];
    setEvents(mergedEvents);

    if (session) {
      const matchedEvent = mergedEvents.find((e) => e.id === session.eventId);
      setFormData((prev) => ({
        ...prev,
        event: matchedEvent ? matchedEvent.name : "",
        sessionTitle: session.title
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Basic check
    if (!formData.name || !formData.email || !formData.event) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Form submitted:", formData);

    // Save registration to localStorage
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    registrations.push(formData);
    localStorage.setItem("registrations", JSON.stringify(registrations));

    alert(`Registration submitted for ${formData.sessionTitle || formData.event}!`);

    // Redirect to ticket page (passing session state if available)
    if (session) {
      navigate(`/ticket/${session.id}`, { state: { session } });
    } else {
      navigate("/events"); // fallback if no session
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Register {formData.sessionTitle && `for "${formData.sessionTitle}"`}</h2>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Event:</label>
        {session ? (
          <input
            type="text"
            name="event"
            value={formData.event}
            readOnly
          />
        ) : (
          <select
            name="event"
            value={formData.event}
            onChange={handleChange}
            required
          >
            <option value="">-- Select an Event --</option>
            {events.map((event) => (
              <option key={event.id} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          style={{
            display: "block",
            width: "100%",
            marginTop: "1.5rem",
            padding: "0.75rem",
            fontSize: "1rem",
            fontWeight: "bold",
            fontFamily: "inherit",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Get Ticket
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
