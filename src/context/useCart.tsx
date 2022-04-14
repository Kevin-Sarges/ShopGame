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
import { Product } from "../@types";

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

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextProps {
  const context = useContext(CartContext);

  return context;
}
