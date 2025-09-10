import React from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react"
import GAddModal from "../Components/Modals/GoalsModals/GoalsAddModal";
import GDeleteModal from "../Components/Modals/GoalsModals/GoalsDeleteModal";
import GEditModal from "../Components/Modals/GoalsModals/GoalsEditModal";

const Goals = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);

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
          <button 
            className="flex items-center gap-2 bg-[#9FD8CB] text-black font-bold px-4 py-2 rounded-full shadow hover:bg-[#4bb69e] transition"
            onClick={() => setModalOpen(true)}
            >
            <Plus size={16} />
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
              <button 
                className="border border-red-500 text-red-500 font-bold bg-white px-4 py-2 rounded-lg shadow hover:bg-red-500 hover:text-white transition"
                onClick={() => setDeleteModalOpen(true)}
                >
                Delete Goal
              </button>
              <button 
                className="bg-[#9FD8CB] text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-[#4bb69e] transition"
                onClick={() => setEditModalOpen(true)}>
                Edit Goal
              </button>
            </div>
          </div>
        ))}
      </div>
      <GAddModal isOpen={ModalOpen} onClose={() => setModalOpen(false)} />
      <GDeleteModal isOpen={DeleteModalOpen} onClose={() => setDeleteModalOpen(false)} />
      <GEditModal isOpen={EditModalOpen} onClose={() => setEditModalOpen(false)} />
    </DashboardLayout>
  );
};

export default Goals;
