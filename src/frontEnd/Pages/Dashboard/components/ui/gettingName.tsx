import { useEffect, useState } from "react";
import { getName } from "../../../../../backEnd/getNameSettings";

const UserName = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const fetchedName = await getName();
        setName(fetchedName.replace(/"/g, "")); // Remove quotes from name
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };

    fetchName();
  }, []);

  return (
    <h1
      className={`text-2xl font-bold text-gray-800 truncate ${
        isCollapsed ? "text-center" : "text-left"
      }`}
    >
      {isCollapsed ? name.slice(0, 2).toUpperCase() : name}
    </h1>
  );
};

export default UserName;
