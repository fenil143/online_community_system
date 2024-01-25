"use client";
import React, { useState } from "react";
import events from "./components/data";
import Child from "./components/child";

const EventListComponent = () => {
  const [isAddEventModalOpen, setAddEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    event_time: new Date(),
    event_description: "",
    event_image: null,
    location: "",
    organizer: "Unknown",
    max_attendees: 100,
  });

  const openAddEventModal = () => {
    setAddEventModalOpen(true);
  };

  const closeAddEventModal = () => {
    setAddEventModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleCreateEvent = () => {
    // You can add logic here to send the new event data to your server/database
    console.log("Creating Event:", newEvent);

    // Close the modal after creating the event
    closeAddEventModal();
  };

  return (
    <div className="event-list flex flex-col items-end gap-4 p-4">
      <div className="overflow-y-auto">
       {events.map((event, index) => (
        <div
          key={event.event_id}
          className={`flex ${
            index % 2 === 0 ? "flex-row-reverse w-full" : "flex-row w-full"
          } items-center`}
        >
          <Child event={event} />
        </div>
      ))}
      </div>

      <div
        className="add-event-button fixed bottom-4 right-4 bg-blue-500 text-white p-4 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-600 transition"
        onClick={openAddEventModal}
      >
        +
      </div>

      {isAddEventModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

            {/* Form fields */}
            <div className="mb-4 flex items-center">
              <div className="w-1/2 pr-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Event Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Event Time:
                </label>
                <input
                  type="date"
                  name="event_time"
                  value={newEvent.event_time}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Description:
              </label>
              <textarea
                name="event_description"
                value={newEvent.event_description}
                onChange={handleInputChange}
                className="border p-2 w-full"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Event Image URL:
              </label>
              <input
                type="file"
                name="event_image"
                value={newEvent.event_image}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>

            <div className="mb-4 flex items-center">
              <div className="w-1/2 pr-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Organizer:
                </label>
                <input
                  type="text"
                  name="organizer"
                  value={newEvent.organizer}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Max Attendees:
              </label>
              <input
                type="number"
                name="max_attendees"
                value={newEvent.max_attendees}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={handleCreateEvent}
              >
                Create Event
              </button>
              <button
                className="ml-2 text-gray-600 hover:text-gray-800"
                onClick={closeAddEventModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventListComponent;
