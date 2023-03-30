import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="border border-gray-300 rounded-full h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Loader;
