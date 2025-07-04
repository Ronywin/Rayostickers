'use client';

import type { Sticker, CartItem } from '@/types';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const CART_STORAGE_KEY = 'rayo-stickers-cart';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (sticker: Sticker) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartLoaded: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
    setIsCartLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isCartLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cart to localStorage", error);
      }
    }
  }, [cartItems, isCartLoaded]);


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
      title: "¡Añadido al carrito!",
      description: `${sticker.name} ahora está en tu carrito de compras.`,
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast({
        title: "Producto eliminado",
        description: "El sticker ha sido eliminado de tu carrito.",
        variant: 'destructive'
      });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      let stickerName = '';
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            stickerName = item.name;
            return { ...item, quantity };
          }
          return item;
        })
      );
      if (stickerName) {
        toast({
            title: "Carrito actualizado",
            description: `La cantidad para ${stickerName} ha sido actualizada.`,
        });
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isCartLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
};
