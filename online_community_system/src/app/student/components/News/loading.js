import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full object-contain ml-4 mr-4">
    {/* Place the script tag in the head of your HTML document */}
    {/*  */}
    
    {/* Embed the dotlottie-player directly in your component */}
    <dotlottie-player
      src="https://lottie.host/bc495a29-f904-474a-bcbc-2765887f6da1/u1B0xuM0mH.json"
      background="transparent"
      speed="1"
      className="w-300px h-300px"
      loop
      autoplay
    ></dotlottie-player>
  </div>
  );}
  export default Loading;