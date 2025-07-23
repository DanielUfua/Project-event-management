import React, { useState, useEffect } from "react";

// Hardcoded Events and Sessions
const defaultEvents = [
  { id: 1, name: "Tech Summit 2025", price: 50 },
  { id: 2, name: "Women in Computing Conference", price: 40 },
  { id: 3, name: "Cybersecurity Awareness Workshop", price: 20 },
  { id: 4, name: "Hackathon Code for Good", price: 15 },
  { id: 5, name: "Resume & LinkedIn Workshop", price: 10 },
  { id: 6, name: "Internship Prep Workshop", price: 12 },
  { id: 7, name: "JavaScript Crash Course", price: 25 }
];

const defaultSessions = [
  { id: 101, eventId: 1, title: "Opening Keynote", price: 15 },
  { id: 102, eventId: 1, title: "AI & Ethics", price: 20 },

  { id: 201, eventId: 2, title: "Women in Tech Panel", price: 10 },
  { id: 202, eventId: 2, title: "Breaking Barriers", price: 12 },

  { id: 301, eventId: 3, title: "Phishing Awareness", price: 8 },
  { id: 302, eventId: 3, title: "Network Hardening 101", price: 9 },

  { id: 401, eventId: 4, title: "Hackathon Kickoff", price: 5 },
  { id: 402, eventId: 4, title: "Project Presentations", price: 5 },

  { id: 501, eventId: 5, title: "Resume Review", price: 5 },
  { id: 502, eventId: 5, title: "LinkedIn Do’s & Don’ts", price: 6 },

  { id: 601, eventId: 6, title: "Intern Q&A", price: 6 },
  { id: 602, eventId: 6, title: "Interview Practice", price: 6 },

  { id: 701, eventId: 7, title: "Intro to JavaScript", price: 12 },
  { id: 702, eventId: 7, title: "JS Project Demo", price: 13 }
];

const Tickets = () => {
  const [events, setEvents] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const storedSessions = JSON.parse(localStorage.getItem("sessions")) || [];

    setEvents([...defaultEvents, ...storedEvents]);
    setSessions([...defaultSessions, ...storedSessions]);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Tickets & Pricing</h2>

      {events.map((event) => {
        const eventSessions = sessions.filter((s) => s.eventId == event.id);

        return (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}
          >
            <h3>{event.name}</h3>
            <p><strong>Event Ticket:</strong> {event.price ? `$${event.price.toFixed(2)}` : "Price Not Set"}</p>

            <div style={{ marginTop: "10px" }}>
              <h4>Sessions:</h4>
              {eventSessions.length > 0 ? (
                eventSessions.map((session) => (
                  <div key={session.id} style={{ paddingLeft: "10px", marginBottom: "5px" }}>
                    • {session.title} – <strong>{session.price ? `$${session.price.toFixed(2)}` : "Price Not Set"}</strong>
                  </div>
                ))
              ) : (
                <p style={{ fontStyle: "italic" }}>No sessions listed.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tickets;
