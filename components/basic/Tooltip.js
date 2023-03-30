import React, { useState } from "react";
import classNames from "classnames";

const Tooltip = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="relative inline-block">
      <div
        className="text-blue-500 cursor-pointer"
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
      >
        {children}
      </div>
      <div
        className={classNames(
          "bg-gray-800 text-white text-sm px-2 py-1 rounded-md absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-0 pointer-events-none transition-opacity duration-300",
          {
            "opacity-100 pointer-events-auto": showTooltip,
          }
        )}
      >
        {text}
        <div className="arrow-up"></div>
      </div>
    </div>
  );
};

export default Tooltip;
