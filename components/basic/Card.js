import React from 'react';

const Card = ({ title, description, imageSrc, buttonText, buttonLink }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="mb-4">
        <img src={imageSrc} alt={title} className="w-full rounded-md object-cover" />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="text-right">
        <a href={buttonLink} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default Card;
