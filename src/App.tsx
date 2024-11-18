import { lazy, Suspense } from "react";
import "./App.css";

function App() {
  const AppRoutes = lazy(() => import("./Routes"));

  return (
    <Suspense fallback={<div>Loading</div>}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
