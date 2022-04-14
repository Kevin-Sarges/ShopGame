import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";

import Logo from "../../assets/Logo.svg";
import { useCart } from "../../context/useCart";
import { Container, Cart } from "./styles";

export function Header() {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <Container>
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Carrinho</strong>
          <span>
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>

        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}
