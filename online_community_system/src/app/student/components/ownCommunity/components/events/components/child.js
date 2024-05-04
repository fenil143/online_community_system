"use client";
import React, { useState } from "react";
import axios from "axios";
import "../../../../../../admin/components/verifiedCommunities/components/style.css";
import { Modal } from '../../../../../../admin/components/verifiedCommunities/components/child';

const EventListComponent = ({ event }) => {
  const [readMore, setReadMore] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const showModal = () => setIsOpen(true)
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  function formatEventTime(eventTime) {
    const date = new Date(eventTime);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return date.toLocaleDateString(undefined, options);
  }
  const handleImageNavigation = (direction) => {
    const length = event.event_image.length;
    if (direction === "next") {
      setCurrentImageIndex((currentImageIndex + 1) % length);
    } else {
      setCurrentImageIndex((currentImageIndex - 1 + length) % length);
    }
  };
  const getDetails = async ()=>{
    axios.post("http://localhost:8000/getdetails", {
      email: localStorage.getItem("student"),
      event:event.event_id
  }).then((response) => {
      alert("Students List SuccessFully Sent")
    //console.log(response.data.Data);

}).catch((error)=>{
  alert(error)
})
  }
  return (
    <>
    {isOpen && (
       <Modal
         src={event.event_image[currentImageIndex]}
         alt="snow"
         caption={event.name}
         onClose={() => setIsOpen(false)}
       />
     )}
    <div
      key={event.event_id}
      className="event-card bg-white p-4 rounded-md shadow-md w-3/3"
    >
      <div className="event-images mb-4 relative overflow-hidden">
        <div className="w-full h-48 flex items-center justify-center relative">
          <img
            src={event.event_image[currentImageIndex]}
            onClick={showModal}
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
        <p className="text-gray-600"><b>Location :- </b>{event.location}</p>
        <p className="text-gray-600"><b>Time :- </b> {formatEventTime(event.event_time)}</p>
        <p className="text-gray-600"><b>Organizer :- </b> {event.organizer}</p>

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
                  {event.current_attendees} / {event.max_attendees}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-grow bg-indigo-200 h-4 rounded-full relative overflow-hidden">
                <div
                  style={{
                    width: `${
                      (((event.current_attendees == undefined)? 0 : event.current_attendees) / event.max_attendees) * 100
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
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={getDetails}
          >
             Get Details
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default EventListComponent;
