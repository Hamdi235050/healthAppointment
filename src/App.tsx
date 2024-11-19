import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  const AppRoutes = lazy(() => import("./Routes"));

  return (
    <Suspense fallback={<div>Loading</div>}>
      <AppRoutes />
      <ToastContainer />
    </Suspense>
  );
}

export default App;
