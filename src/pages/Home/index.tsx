import { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

import { api } from "../../services/api";
import { formatPrice } from "../../utils/format";
import { useCart } from "../../context/useCart";

import { Container } from "./styles";

interface Product {
  id: number;
  name: string;
  price: number;
  score: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemAmount {
  [key: number]: number;
}

export function Home() {
  const { addPropduct, cart } = useCart();
  const [products, setProducts] = useState<ProductFormatted[]>([]);

  const cartItemAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemAmount);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get("/products");

        setProducts(data);
      } catch (error) {
        toast.error("Erro ao lista produtos !!");
      }
    }

    loadProducts();
  }, []);

  async function handleAddProduct(id: number) {
    addPropduct(id);
  }

  return (
    <Container>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt="Produto" />
          <strong>{product.name}</strong>
          <span>{formatPrice(product.price)}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemAmount[product.id] || 0}
            </div>

            <span>Adicionar ao Carrinho</span>
          </button>
        </li>
      ))}
    </Container>
  );
}
