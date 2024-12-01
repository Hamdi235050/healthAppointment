import React from "react";

export const AppLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-gray-600">Loading ...</p>
      </div>
    </div>
  );
};
