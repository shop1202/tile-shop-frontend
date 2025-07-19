import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import Sale from "./pages/Sale";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="sale" element={<Sale />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
