// Not_Found.jsx
import React from "react";

const Not_Found = () => {
  return (
    <div className=" aspect-w-16 aspect-h-9">
      {/* Place the script tag in the head of your HTML document */}
      {/*  */}
      
      {/* Embed the dotlottie-player directly in your component */}
      <dotlottie-player
        src="https://lottie.host/2d1213dc-e386-4560-a65f-3cad78e9b310/MzV1U29Dzt.json"
        background="transparent"
        speed="1"
        className="w-full h-full"
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default Not_Found;
