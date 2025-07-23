import React, { useState, useEffect } from "react";
import Session from "./Session";

// Default hardcoded events
const defaultEvents = [
  { id: 1, name: "Tech Summit 2025", date: "07/02/2025", location: "New York City, NY", description: "Annual technology summit with keynotes and panels." },
  { id: 2, name: "Women in Computing Conference", date: "08/10/2025", location: "San Francisco, CA", description: "Celebrating women in tech with networking and talks." },
  { id: 3, name: "Cybersecurity Awareness Workshop", date: "09/18/2025", location: "Charlotte, NC", description: "A hands-on event teaching students basic cybersecurity practices." },
  { id: 4, name: "Hackathon Code for Good", date: "10/02/2025", location: "Norfolk, VA", description: "A 24-hour coding challenge focused on solving social issues." },
  { id: 5, name: "Resume & LinkedIn Workshop", date: "11/13/2025", location: "Dallas, TX", description: "Tips and feedback on building your online professional brand." },
  { id: 6, name: "Internship Prep Workshop", date: "12/5/2025", location: "Atlanta, GA", description: "Learn how to find, apply for, and succeed in internships." },
  { id: 7, name: "JavaScript Crash Course", date: "12/17/2025", location: "Washington D.C.", description: "A beginner-friendly coding class with real project examples." }
];

// Default hardcoded sessions
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

const Events = () => {
  const [openEventId, setOpenEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const storedSessions = JSON.parse(localStorage.getItem("sessions")) || [];

    setEvents([...defaultEvents, ...storedEvents]);
    setSessions([...defaultSessions, ...storedSessions]);
  }, []);

  const toggleSessions = (eventId) => {
    setOpenEventId(openEventId === eventId ? null : eventId);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Upcoming Events</h2>

      {events.map((event) => {
        const eventSessions = sessions.filter((s) => s.eventId == event.id);

        return (
          <div
            key={event.id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>

            <button
              onClick={() => toggleSessions(event.id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              {openEventId === event.id ? "Hide Sessions" : "View Sessions"}
            </button>

            {openEventId === event.id && <Session sessions={eventSessions} />}
          </div>
        );
      })}
    </div>
  );
};

export default Events;
