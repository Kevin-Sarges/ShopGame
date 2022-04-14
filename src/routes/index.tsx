import { Routes, Route } from "react-router-dom";

import { Cart } from "../pages/Cart";
import { Home } from "../pages/Home";

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
