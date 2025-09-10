import React from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { useEffect } from "react";

const Goals = () => {
  useEffect(() => {
      document.title = "Goals | FinTech";
    }, []);

  const cards = [
    { id: 1, title: "Card 1", description: "This is card one." },
    { id: 2, title: "Card 2", description: "This is card two." },
    { id: 3, title: "Card 3", description: "This is card three." },
    { id: 4, title: "Card 4", description: "This is card four." },
    { id: 5, title: "Card 5", description: "This is card five." },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 suppressHydrationWarning={true} className="text-2xl">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>
        <input
          type="text"
          placeholder="Search Here"
          className="border rounded-full px-4 py-2"
        />
      </div>
      <hr className="mb-5" />

      {/* Goals Cards */}
      <div className="flex justify-end mb-5">
          <button className="bg-primary text-white px-4 py-2 rounded-lg">
            New Goal
          </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-xl p-4 border mb-4"
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-gray-500">{card.description}</p>
            
            {/* Card Buttons */}
            <div className="flex justify-center mt-4 gap-3">
              <button className="border-red-500 text-red-500 bg-white px-4 py-2 rounded-lg">
                Delete Goal
              </button>
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Edit Goal
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Goals;
