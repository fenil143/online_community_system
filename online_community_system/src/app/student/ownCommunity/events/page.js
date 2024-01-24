"use client";
import React, { useState } from "react";
import events from "./components/data";
import Child from "./components/child";

const EventListComponent = () => {
  const [readMore, setReadMore] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const toggleReadMore = (eventId) => {
    setReadMore((prevReadMore) => ({
      ...prevReadMore,
      [eventId]: !prevReadMore[eventId],
    }));
  };

  const handleImageNavigation = (eventId, direction) => {
    setCurrentImageIndex((prevIndex) => {
      const currentIndex = prevIndex[eventId] || 0;
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % events.find((event) => event.event_id === eventId).event_image.length
          : (currentIndex - 1 + events.find((event) => event.event_id === eventId).event_image.length) %
            events.find((event) => event.event_id === eventId).event_image.length;
        console.log(prevIndex);
      return {
        ...prevIndex,
        [eventId]: newIndex,
      };
    });
  };

  return (
    <div className="event-list flex flex-col items-end gap-4 p-4">
      {events.map((event) => (
        <Child event = {event} key={event.event_id}/>
      ))}
      {/* Add a "+" option to add a new event at the right-bottom corner */}
      <div
        className="add-event-button fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full cursor-pointer"
        onClick={() => console.log("Add Event clicked")}
      >
        +
      </div>
    </div>
  );
};

export default EventListComponent;
