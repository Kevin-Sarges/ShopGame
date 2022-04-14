import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { toast } from "react-toastify";
import { api } from "../services/api";

export interface Product {
  id: number;
  name: string;
  price: number;
  score: number;
  image: string;
  amount: number;
}

interface CartProvideProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextProps {
  cart: Product[];
  addPropduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export function CartProvider({ children }: CartProvideProps) {
  const [cart, setCart] = useState<Product[]>(() => {
    const storageCart = localStorage.getItem("@E-commerce-cart");

    if (storageCart) {
      return JSON.parse(storageCart);
    }

    return [];
  });

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem("@E-commerce-cart", JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  async function addPropduct(productId: number) {
    try {
      const updateCart = [...cart];
      const productExists = updateCart.find(
        (product) => product.id === productId
      );

      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;
      const currentAmount = productExists ? productExists.amount : 0;

      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      if (productExists) {
        productExists.amount = amount;
      } else {
        const product = await api.get(`/products/${productId}`);

        const newProduct = {
          ...product.data,
          amount: 1,
        };

        updateCart.push(newProduct);
      }

      setCart(updateCart);
    } catch (error) {
      toast.error("Erro na adição do produto");
    }
  }

  function removeProduct(productId: number) {
    try {
      const updateCart = [...cart];
      const productIndex = updateCart.findIndex(
        (product) => product.id === productId
      );

      if (productIndex >= 0) {
        updateCart.splice(productIndex, 1);
        setCart(updateCart);
      } else {
        throw Error();
      }
    } catch (error) {
      toast.error("Erro na remoção do produto");
    }
  }

  async function updateProductAmount({
    productId,
    amount,
  }: UpdateProductAmount) {
    try {
      if (amount <= 0) {
        return;
      }

      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const updateCart = [...cart];
      const productExists = updateCart.find(
        (product) => product.id === productId
      );

      if (productExists) {
        productExists.amount = amount;
        setCart(updateCart);
      } else {
        throw Error();
      }
    } catch (error) {
      toast.error("Erro na alteração de quantidade do produto");
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addPropduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextProps {
  const context = useContext(CartContext);

  return context;
}
