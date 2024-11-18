import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accueil } from "./frontEnd/Pages/Accueil/Accueil";
import Login from "./frontEnd/Pages/Login";
export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path={`/`} element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  );
};
