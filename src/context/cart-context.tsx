'use client';

import type { Sticker, CartItem } from '@/types';
import React, { createContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (sticker: Sticker) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (sticker: Sticker) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === sticker.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === sticker.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...sticker, quantity: 1 }];
    });
    toast({
      title: "Added to cart!",
      description: `${sticker.name} is now in your shopping cart.`,
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast({
        title: "Item removed",
        description: "The sticker has been removed from your cart.",
        variant: 'destructive'
      });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
