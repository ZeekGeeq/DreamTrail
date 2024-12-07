import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Calendar.module.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // get calendar events matching the q search
    axios
      .get("http://localhost:5000/api/calendar/events", {
        withCredentials: true,
      })
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="calendar-container">
      <h1>DreamTrail Events</h1>
      {events.length > 0 ? (
        <ul className="events-list">
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <h2>{event.summary}</h2>
              <p>{new Date(event.start).toLocaleString()}</p>
              {event.end && <p>End: {new Date(event.end).toLocaleString()}</p>}
              {event.description && <p>{event.description}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No trails found.</p>
      )}
    </div>
  );
};

export default Calendar;
