"use client";
import React, { useState, useEffect, useRef } from "react";
import Data from "./components/data";
import Child from "./components/child";
import "./event.css";
import axios from "axios";

const EventListComponent = () => {
  const [isAddEventModalOpen, setAddEventModalOpen] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const eventsEndRef = useRef(null);
  useEffect(() => {
    if (localStorage.getItem("student") === null) {
      router.push("/authentication/loginStudent");
    }
    const fetchData = async () => {
      try {
        let data = await Data(localStorage.getItem("ownCommunity"));
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(() => {
    if (eventsEndRef.current) {
      eventsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [eventsData]);


  const [newEvent, setNewEvent] = useState({
    name: "",
    event_time: new Date(),
    event_description: "",
    event_images: [],
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
    const { name, value, files } = e.target;

    if (name === "event_image") {
      const imagesArray = Array.from(files);
      let check = false;
      imagesArray.forEach((image) => {
        if (image.size > 5 * 1024 * 1024) {
          check = true;
        } 
      })
      if(check){
        alert("Image size should be less than 5 MB. Please try again otherwise some images will not be stored.");
        return ;
      }
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        event_images: imagesArray,
      }));
    } else {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }
  };

  const handleCreateEvent = () => {
    const requiredFields = [
      "name",
      "event_time",
      "event_description",
      "event_images",
      "location",
      "organizer",
    ];
    const isEmptyField = requiredFields.some((field) => !newEvent[field]);
    if (isEmptyField) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Creating Event:", newEvent);
    let promises = [];

    newEvent.event_images.forEach((image) => {
      const data = new FormData();
      if (image) {
        data.append("file", image);
      } else {
        console.error("Image is undefined");
      }
      data.append("upload_preset", "xtf3nszf");
      data.append("cloud_name", "da3airmpg");

      const promise = fetch(
        "https://api.cloudinary.com/v1_1/da3airmpg/image/upload",
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data.url;
        })
        .catch((err) => {
          console.error(err);
          return null;
        });

      promises.push(promise);
    });

    Promise.all(promises)
      .then((urls) => {
        console.log(urls);
        let addEvent = newEvent;
        addEvent.event_image = urls;
        addEvent.community_id = localStorage.getItem("ownCommunity");

        axios
          .post("https://online-community-system.onrender.com/addEvent", addEvent)
          .then((response) => {
            const event_id = response.data.event_id;
            const url =
              "https://online-community-system.onrender.com/addCommunityEvent/" +
              response.data.community_id;
            axios
              .post(url, { event_id: event_id })
              .then((response) => {
                console.log("event added successfully");
                addEvent.current_attendees = 0;
                setEventsData((prevEvents) => [...prevEvents, addEvent]);
              })
              .catch((error) => {
                alert("Can not add event");
              });
          })
          .catch((error) => {
            alert("Can not add event");
          });
      })
      .catch((err) => {
        console.error(err);
      });

    closeAddEventModal();
  };

  return (
    <div className="event-list flex flex-col items-end gap-4 p-4">
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {eventsData.map((event, index) => (
          <div
            key={event.event_id}
           
          >
            <Child event={event} />
          </div>
        ))}
        <div ref={eventsEndRef} />
      </div>

      <div
        className="add-event-button fixed bottom-4 right-4 bg-blue-500 text-white p-4 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-md"
        onClick={openAddEventModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </div>

      {isAddEventModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

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
                onChange={handleInputChange}
                // value = {newEvent.event_images}
                className="border p-2 w-full"
                multiple
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
