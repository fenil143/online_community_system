"use client";
import React, { useState, useEffect, useRef } from "react";
import Data from "./component1/data";
import Child from "./component1/child";
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
        let data = await Data(localStorage.getItem("otherCommunity"));
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


  return (
    <div className="event-list flex flex-col items-end gap-4 p-4">
      <div className="overflow-y-auto">
        {eventsData.map((event, index) => (
          <div
            key={event.event_id}
            className={`flex ${
              index % 2 === 0 ? "flex-row-reverse w-full" : "flex-row w-full"
            } items-center`}
          >
            <Child event={event} />
          </div>
        ))}
        <div ref={eventsEndRef} />
      </div>
    </div>
  );
};

export default EventListComponent;
