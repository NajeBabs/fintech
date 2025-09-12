import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Repeat,
  Wallet,
  Target,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { name: "Overview", path: "/overview", icon: <LayoutDashboard /> },
    { name: "Balances", path: "/balances", icon: <CreditCard /> },
    { name: "Transactions", path: "/transactions", icon: <Repeat /> },
    { name: "Expenses", path: "/expenses", icon: <Wallet /> },
    { name: "Goals", path: "/goals", icon: <Target /> },
  ];

  return (
    <div className="w-64 bg-fintech-dark text-white flex flex-col p-4">
      <a href="/overview" className="text-xl font-bold mb-6">
        <img src="./Images/fintech logo.png" alt="FinTech Logo" />
      </a>

      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-fintech-mint text-black font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 p-2">
        <a href="/profile" className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm">
            {profile?.firstName} {profile?.lastName || ""}
          </span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
