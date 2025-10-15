import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/app.jsx";
import Adm from "./pages/adm.jsx";


export default function Navegar() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adm" element={<Adm />} />
      </Routes>
    </BrowserRouter>
  );
}
