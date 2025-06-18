import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const addToCart = (item) => {
    if (!cart.some((one) => one.id === item.id)) {
      setCart([...cart, { ...item, quantity: 1 }]);
      alert("the Item is added to the cart");
    } else {
      alert("the Item is already in the cart");
    }
  };
  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => {
        return item.id !== id;
      })
    );
    alert("Item removed from Cart 🗑️");
  };
  const removeAll = () => {
    setCart([]);
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, removeAll }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
