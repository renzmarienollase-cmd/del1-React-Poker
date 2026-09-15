import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import GameVideoPoker from "./components/Pages/Game-VideoPoker/GameVideoPoker.tsx";
import Mechanics from "./components/Pages/Mechanics/Mechanics.tsx";
import PageNavigation from "./components/PageNavigation/PageNavigation.tsx";
import Container from "./components/Container/Container.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Container as="div">
        <PageNavigation />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/game-videopoker" element={<GameVideoPoker />} />
          <Route path="/mechanics" element={<Mechanics />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </StrictMode>,
);
