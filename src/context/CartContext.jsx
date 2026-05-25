import { useState } from "react";
import { CartContext } from "./CartState";

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const quantityToAdd = Math.max(Number(quantity) || 1, 1);

    setCartItem((currentItems) => {
      const itemInCart = currentItems.find((item) => item.id === product.id);

      if (itemInCart) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: quantityToAdd }];
    });
  };

  const updateQuantity = (productId, action) => {
    setCartItem((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== productId) return item;

          const nextQuantity =
            action === "increase" ? item.quantity + 1 : item.quantity - 1;

          return nextQuantity > 0
            ? { ...item, quantity: nextQuantity }
            : null;
        })
        .filter(Boolean),
    );
  };

  const deleteItem = (productId) => {
    setCartItem((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
