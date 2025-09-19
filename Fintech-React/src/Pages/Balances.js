import React, { useEffect, useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import Modal from "../Components/Modals/AccountModals/AccountAddModal";
import EditModal from "../Components/Modals/AccountModals/AccountEditModal";
import DeleteModal from "../Components/Modals/AccountModals/AccountDeleteModal";
import { getUserAccounts } from "../services/api";
import { Plus } from "lucide-react"

const Balances = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

  // Fetch accounts from API
  const fetchAccounts = async () => {
    try {
      const res = await getUserAccounts();
      const accounts = res.data.map((account) => ({
        ...account,
        description: `Type: ${account.userAccountType} | Balance: ₱${account.currentBalance}`,
      }));
      setCards(accounts);

      const sum = accounts.reduce(
        (acc, account) => acc + account.currentBalance,
        0
      );
      setTotalBalance(sum);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  // Load on mount
  useEffect(() => {
    document.title = "Balances | FinTech";
    fetchAccounts();
  }, []);

  // Provider logos
  const getProviderImage = (provider) => {
    switch (provider.toLowerCase()) {
      case "cash":
        return "/Images/cash.png";
      case "g-cash":
        return "/Images/gcash.png";
      case "maya":
        return "/Images/maya.png";
      case "paypal":
        return "/Images/paypal.png";  
      case "other e-wallets":
        return "/Images/otherewallet.png";  
      case "bdo":
        return "/Images/bdo.png";
      case "bpi":
        return "/Images/bpi.png";
      case "metrobank":
        return "/Images/metrobank.png";
      case "others banks":
        return "/Images/other.png";  
      default:
        return "/Images/Other.png";
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 suppressHydrationWarning className="text-2xl">
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

      {/* Total Balance & Add Button */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl">
          Total Balances: ₱{totalBalance.toLocaleString()}
        </h1>

        <button
          className="flex items-center gap-2 bg-[#9FD8CB] text-black font-bold px-4 py-2 rounded-full shadow hover:bg-[#4bb69e] transition"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={16} />
          Add Account
        </button>
      </div>

      

      {/* Account Cards */}
      {cards.length === 0 ? (
  <p className="text-center text-gray-500 text-lg mt-10">
    No accounts found. Click <span className="font-semibold">Add Account</span> to get started.
  </p>
) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-xl p-4 border"
          >
            <h2 className="text-lg font-semibold text-center">
              {card.accountName}
            </h2>
            <img
              src={getProviderImage(card.providerName)}
              alt={card.accountName}
              className="mx-auto my-2"
            />
            <p className="text-gray-500 text-center">{card.description}</p>

            <div className="flex justify-center mt-4 gap-3">
              <button
                className="border border-red-500 text-red-500 font-bold bg-white px-4 py-2 rounded-lg shadow hover:bg-red-500 hover:text-white transition"
                onClick={() => {
                  setSelectedAccount(card);
                  setDeleteModalOpen(true);
                }}
              >
                Delete Account
              </button>
              <button
                className="bg-[#9FD8CB] text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-[#4bb69e] transition"
                onClick={() => {
                  setSelectedAccount(card);
                  setEditModalOpen(true);
                }}
              >
                Edit Account
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
      {/* Modals */}
      {/* <Modal isOpen={ModalOpen} onClose={() => setModalOpen(false)} /> */}
      <Modal
        isOpen={ModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={fetchAccounts} // refresh list after adding
      />

      <EditModal
        isOpen={EditModalOpen}
        onClose={() => setEditModalOpen(false)}
        account={selectedAccount}
        onUpdate={fetchAccounts} // auto refresh
      />

      <DeleteModal
        isOpen={DeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        account={selectedAccount}
        onDelete={fetchAccounts} // auto refresh
      />
    </DashboardLayout>
  );
};

export default Balances;
