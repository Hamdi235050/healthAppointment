import React from "react";
import { StatCard as StatCardType } from "../../types";

const StatCard: React.FC<StatCardType> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default StatCard;
