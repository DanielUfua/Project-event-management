import React, { useState, useEffect } from "react";

// 7 preset sessions (default)
const defaultSessions = [
  { id: 101, eventId: 1, title: "Opening Keynote", speaker: "Dr. Smith", time: "10:00 AM", location: "Main Hall", price: 15 },
  { id: 102, eventId: 1, title: "AI & Ethics", speaker: "Daniel Ufua", time: "11:30 AM", location: "Room A", price: 20 },

  { id: 201, eventId: 2, title: "Women in Tech Panel", speaker: "Lisa Torres", time: "1:00 PM", location: "Auditorium", price: 10 },
  { id: 202, eventId: 2, title: "Breaking Barriers", speaker: "Angela Ray", time: "2:30 PM", location: "Room 2", price: 12 },

  { id: 301, eventId: 3, title: "Phishing Awareness", speaker: "James Lee", time: "9:00 AM", location: "Lab 1", price: 8 },
  { id: 302, eventId: 3, title: "Network Hardening 101", speaker: "Sarah O.", time: "11:00 AM", location: "Lab 2", price: 9 },

  { id: 401, eventId: 4, title: "Hackathon Kickoff", speaker: "Team Lead", time: "8:00 AM", location: "Commons", price: 5 },
  { id: 402, eventId: 4, title: "Project Presentations", speaker: "Finalists", time: "4:00 PM", location: "Main Hall", price: 5 },

  { id: 501, eventId: 5, title: "Resume Review", speaker: "Career Coach", time: "10:00 AM", location: "Room 5", price: 5 },
  { id: 502, eventId: 5, title: "LinkedIn Do’s & Don’ts", speaker: "HR Specialist", time: "11:00 AM", location: "Room 5", price: 6 },

  { id: 601, eventId: 6, title: "Intern Q&A", speaker: "Former Interns", time: "1:00 PM", location: "Room 204", price: 6 },
  { id: 602, eventId: 6, title: "Interview Practice", speaker: "Career Services", time: "2:00 PM", location: "Room 205", price: 6 },

  { id: 701, eventId: 7, title: "Intro to JavaScript", speaker: "Dev Mentor", time: "10:00 AM", location: "Room JS1", price: 12 },
  { id: 702, eventId: 7, title: "JS Project Demo", speaker: "Student Panel", time: "1:00 PM", location: "Room JS2", price: 13 }
];

const AdminDashboard = () => {
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem("events")) || []);
  const [sessions, setSessions] = useState([]);
  const [eventForm, setEventForm] = useState({ name: "", date: "", location: "", description: "" });
  const [sessionForm, setSessionForm] = useState({ eventId: "", title: "", speaker: "", time: "", location: "", price: "" });

  // Load sessions dynamically: default + admin sessions
  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions([...defaultSessions, ...storedSessions]);
  }, []);

  // Save only admin-added sessions (not default ones) in localStorage
  useEffect(() => {
    const customSessions = sessions.filter(session => session.id > 1000); // Admin-added sessions have id > 1000
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("sessions", JSON.stringify(customSessions));
  }, [events, sessions]);

  const handleEventChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  const handleSessionChange = (e) => {
    setSessionForm({ ...sessionForm, [e.target.name]: e.target.value });
  };

  const addEvent = (e) => {
    e.preventDefault();
    const newEvent = { ...eventForm, id: Date.now() };
    setEvents([...events, newEvent]);
    setEventForm({ name: "", date: "", location: "", description: "" });
  };

  const addSession = (e) => {
    e.preventDefault();
    const newSession = { ...sessionForm, id: Date.now(), eventId: parseInt(sessionForm.eventId) };
    setSessions([...sessions, newSession]);
    setSessionForm({ eventId: "", title: "", speaker: "", time: "", location: "", price: "" });
  };

  const deleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event and its sessions?")) {
      setEvents(events.filter(event => event.id !== eventId));
      setSessions(sessions.filter(session => session.eventId !== eventId));
    }
  };

  const deleteSession = (sessionId) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      setSessions(sessions.filter(session => session.id !== sessionId));
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>

      {/* Add Event Form */}
      <form onSubmit={addEvent} style={{ marginBottom: "2rem" }}>
        <h3>Create New Event</h3>
        <input name="name" placeholder="Event Name" value={eventForm.name} onChange={handleEventChange} required />
        <input name="date" placeholder="Date" value={eventForm.date} onChange={handleEventChange} required />
        <input name="location" placeholder="Location" value={eventForm.location} onChange={handleEventChange} required />
        <textarea name="description" placeholder="Description" value={eventForm.description} onChange={handleEventChange} required />
        <button type="submit" className="submit-btn">Add Event</button>
      </form>

      {/* Events List */}
      <h3>Current Events</h3>
      {events.length > 0 ? (
        events.map(event => (
          <div key={event.id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <strong>{event.name}</strong> - {event.date} - {event.location}
            <button
              onClick={() => deleteEvent(event.id)}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Delete Event
            </button>
          </div>
        ))
      ) : (
        <p>No events yet.</p>
      )}

      {/* Add Session Form */}
      <form onSubmit={addSession} style={{ marginTop: "3rem" }}>
        <h3>Create Session for Event</h3>
        <select name="eventId" value={sessionForm.eventId} onChange={handleSessionChange} required>
          <option value="">Select Event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
        <input name="title" placeholder="Session Title" value={sessionForm.title} onChange={handleSessionChange} required />
        <input name="speaker" placeholder="Speaker" value={sessionForm.speaker} onChange={handleSessionChange} required />
        <input name="time" placeholder="Time" value={sessionForm.time} onChange={handleSessionChange} required />
        <input name="location" placeholder="Location" value={sessionForm.location} onChange={handleSessionChange} required />
        <input name="price" placeholder="Ticket Price ($)" value={sessionForm.price} onChange={handleSessionChange} required />
        <button type="submit" className="submit-btn">Add Session</button>
      </form>

      {/* Sessions List */}
      <h3 style={{ marginTop: "2rem" }}>Current Sessions</h3>
      {sessions.length > 0 ? (
        sessions.map(session => (
          <div key={session.id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <strong>{session.title}</strong> (Event ID: {session.eventId}) - {session.speaker}
            <button
              onClick={() => deleteSession(session.id)}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Delete Session
            </button>
          </div>
        ))
      ) : (
        <p>No sessions yet.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
