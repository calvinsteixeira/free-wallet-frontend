import { Routes, Route } from "react-router-dom";
import { LoginView } from "../Pages/Views/LoginView";
import { RegisterView } from "../Pages/Views/RegisterView";
import { HomeView } from "../Pages/Views/HomeView";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/novo-cadastro" element={<RegisterView />} />
      <Route path="/minha-carteira" element={<HomeView />} />
    </Routes>
  );
}
