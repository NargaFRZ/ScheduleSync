import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ title, desc, url, imgSrc }) => {
  return (
    <div className="card w-full sm:w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <figure className="flex justify-center items-center bg-gray-100">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full"
        />
      </figure>
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{desc}</p>
        </div>
        <div className="text-right mt-auto">
          <Link to={url}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Telusuri
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;