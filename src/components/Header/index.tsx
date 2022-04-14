import { Link } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";

import Logo from "../../assets/Logo.svg";
import { useCart } from "../../context/useCart";
import { Container, Cart } from "./styles";

export function Header() {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <Container>
      <div className="main">
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

          <BsFillCartCheckFill size={36} color="#fff" />
        </Cart>
      </div>
    </Container>
  );
}
