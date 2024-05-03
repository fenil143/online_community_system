// Not_Found.jsx
import React from "react";

const Event= () => {
  return (
    <div className=" aspect-w-14 aspect-h-7">
      {/* Place the script tag in the head of your HTML document */}
      {/*  */}
      
      {/* Embed the dotlottie-player directly in your component */}
      <dotlottie-player
        src="https://lottie.host/6d8148ac-e439-41ad-85b5-348655653aec/5QLHRyMnZz.json"
        background="transparent"
        speed="1"
        className="w-600 h-400"
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default Event;
