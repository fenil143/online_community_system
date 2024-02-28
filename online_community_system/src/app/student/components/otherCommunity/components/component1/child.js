"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EventListComponent = ({ event }) => {
  const [readMore, setReadMore] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentAttendees, setCurrentAttendees] = useState(0);
  const [alreadyPart, setAlreadyPart] = useState(false);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  useEffect(() => {
    setCurrentAttendees(event.current_attendees);
    const email = localStorage.getItem("student");
    const arr = event.joined_students || [];

    if (arr.includes(email)) {
      setAlreadyPart(true);
    }
  }, []);

  const handleImageNavigation = (direction) => {
    const length = event.event_image.length;
    if (direction === "next") {
      setCurrentImageIndex((currentImageIndex + 1) % length);
    } else {
      setCurrentImageIndex((currentImageIndex - 1 + length) % length);
    }
  };

  const joinEvent = () => {
    if(event.max_attendees == currentAttendees){
      alert("No space are remaining");
    }
    const email = localStorage.getItem("student");
    const eventId = event.event_id;

    const url = "https://online-community-system.onrender.com/addStudentToEvent/" + eventId;
    axios
      .patch(url, { student_email: email })
      .then((response) => {
        setCurrentAttendees(response.data.current_attendees);
        setAlreadyPart(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const leaveEvent = () => {
    const email = localStorage.getItem("student");
    const eventId = event.event_id;
    const url = "https://online-community-system.onrender.com/removeStudentFromEvent/" + eventId;
    axios.patch(url, { student_email : email}).then((response) => {
        setCurrentAttendees(response.data.current_attendees);
        setAlreadyPart(false);
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <div
      key={event.event_id}
      className="event-card bg-white p-4 rounded-md shadow-md w-3/3"
    >
      <div className="event-images mb-4 relative overflow-hidden">
        <div className="w-full h-48 flex items-center justify-center relative">
          <img
            src={event.event_image[currentImageIndex]}
            alt={`Event ${event.event_id} Image`}
            className="w-full h-full object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
          />
          {event.event_image.length > 1 && (
            <>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md"
                onClick={() => handleImageNavigation("prev")}
              >
                &lt;
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md"
                onClick={() => handleImageNavigation("next")}
              >
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
      <div className="event-description mb-2">
        {readMore ? (
          <p>{event.event_description}</p>
        ) : (
          <p className="line-clamp-1">{event.event_description}</p>
        )}
        <button
          className="text-blue-500 hover:underline"
          onClick={() => toggleReadMore()}
        >
          {readMore ? "Read Less" : "Read More"}
        </button>
      </div>
      <div className="event-location mb-2">
        <p className="text-gray-600">{event.location}</p>
      </div>
      <div className="event-attendees mb-4 flex items-center">
        <div className="flex-grow">
          <div className="relative pt-2">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-500 bg-indigo-200">
                  Attendees
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-500">
                  {currentAttendees} / {event.max_attendees}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-grow bg-indigo-200 h-4 rounded-full relative overflow-hidden">
                <div
                  style={{
                    width: `${
                      ((currentAttendees == undefined ? 0 : currentAttendees) /
                        event.max_attendees) *
                      100
                    }%`,
                  }}
                  className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-transform transform"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div class="event-actions mt-2 space-x-4">
          {alreadyPart ? (
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              onClick={leaveEvent}
            >
              Leave Event
            </button>
          ) : (
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={joinEvent}
            >
              Join Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListComponent;
