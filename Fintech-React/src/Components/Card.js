import React from "react";

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default Card;
