import React from "react";

const login = () => {
  return (
    <>
      <div className="p-30">
        <h1 className="relative text-white z-50 bg-green-800 p-2 pr-3 pl-3 bg-opacity-70 shadow-gray-700 shadow-md ml-2 text-center text-xs md:text-md lg:text-base rounded-md">
          <b>HAWAI'I HACKATHON 2024</b> <br /> Hawai'i Keiki Museum Challenge
        </h1>

        <h1 className="relative text-stone-800 p-2 bg-opacity-70 mt-2 text-center text-xs md:text-md lg:text-base">
          <em>KILOWATT</em>
        </h1>
        <div className="relative  text-white z-50 bg-gray-400  shadow-gray-700 shadow-md hover:bg-slate-500 bg-opacity-70 rounded-md p-2 text-xs md:text-md lg:text-base">
          <a href="/api/auth/login">Login</a>
        </div>
      </div>
    </>
  );
};

export default login;
