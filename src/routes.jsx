import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/app.jsx";


export default function Navegar() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
