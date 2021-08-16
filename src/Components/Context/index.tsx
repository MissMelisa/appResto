import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Cart, SelectedSize } from "../../types";

type CartContextType = {
  cart: Cart[];
  totalCartItem: number;
  addNewItem: (orderItem: Cart) => void;
  updateItemQuantity: (quantity: number, id: number) => void;
  deleteItem: (id: number) => void;
};

const initialContext: CartContextType = {
  cart: [],
  totalCartItem: 0,
  addNewItem: () => {},
  updateItemQuantity: () => {},
  deleteItem: () => {},
};
export const CartContext = React.createContext(initialContext);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("You can't use a useCart outside CartProvider");
  }
  return context;
} //hook useContext

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart[]>(
    JSON.parse(localStorage.getItem("myCart") || "") || []
  );

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  function addNewItem(orderItem: Cart) {
    setCart((prevState) => {
      orderItem.id = prevState.length + 1;
      return [...prevState, orderItem];
    });
  }

  function updateItemQuantity(quantity: number, id: number) {
    const newOrderItems = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + quantity };
      }

      return item;
    });
    setCart(newOrderItems);
  }

  function deleteItem(id: number) {
    const newItems = cart.filter((cart) => cart.id !== id);
    setCart(newItems);
  }

  const totalCartItem = cart.reduce(
    (total, cartItem) => (total = total + cartItem.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalCartItem,
        addNewItem,
        updateItemQuantity,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
