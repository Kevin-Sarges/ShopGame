import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { RoutesApp } from "./routes";
import { Header } from "./components/Header";
import { CartProvider } from "./context/useCart";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <RoutesApp />
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
