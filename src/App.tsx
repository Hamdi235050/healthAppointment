import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { DarkModeProvider } from "./DarkModeContext/DarkModeProvider";
function App() {
  const AppRoutes = lazy(() => import("./Routes"));

  return (
    <Suspense fallback={<div>Loading</div>}>
      <DarkModeProvider>
        <AppRoutes />
        <ToastContainer />
      </DarkModeProvider>
    </Suspense>
  );
}

export default App;
