import React from "react";
import { History } from "lucide-react";
import Sidebar from "./components/Sidebar";

interface Transaction {
  id: number;
  date: string;
  patient: string;
  type: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
}

const Transactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: "15/03/2024",
      patient: "Jean Dupont",
      type: "Consultation",
      amount: 25,
      status: "completed",
    },
    {
      id: 2,
      date: "14/03/2024",
      patient: "Marie Martin",
      type: "Suivi",
      amount: 30,
      status: "completed",
    },
    {
      id: 3,
      date: "13/03/2024",
      patient: "Pierre Bernard",
      type: "Consultation urgente",
      amount: 40,
      status: "pending",
    },
  ];

  const statusStyles = {
    completed: "text-green-700 bg-green-100",
    pending: "text-yellow-700 bg-yellow-100",
    cancelled: "text-red-700 bg-red-100",
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <History className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Historique des Transactions
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Patient</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Montant</th>
                <th className="text-left py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4">{transaction.patient}</td>
                  <td className="py-3 px-4">{transaction.type}</td>
                  <td className="py-3 px-4">{transaction.amount}€</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        statusStyles[transaction.status]
                      }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
