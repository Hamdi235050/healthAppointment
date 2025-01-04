import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// Create Context
const DarkModeContext = createContext<
  { isDarkMode: boolean; toggleDarkMode: () => void } | undefined
>(undefined);

// Custom hook to use the DarkModeContext
export const useDarkMode = () => useContext(DarkModeContext);

// DarkModeProvider component
interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    // Save the dark mode preference to localStorage
    localStorage.setItem("darkMode", isDarkMode.toString());
    // Apply dark mode styles to the body element
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
