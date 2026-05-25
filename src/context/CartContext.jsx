import { useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartState";

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const quantityToAdd = Math.max(Number(quantity) || 1, 1);

    setCartItem((currentItems) => {
      const itemInCart = currentItems.find((item) => item.id === product.id);

      if (itemInCart) {
        toast.success("Product quantity increased!");
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      toast.success("Product is added to cart!");
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

          if (action === "increase") {
            toast.success("Quantity is increased!");
          } else if (action === "decrease") {
            toast.success("Quantity is decreased!");
          }

          return nextQuantity > 0
            ? { ...item, quantity: nextQuantity }
            : null;
        })
        .filter(Boolean),
    );
  };

  const deleteItem = (productId) => {
    toast.success("Product is deleted from cart!");
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
