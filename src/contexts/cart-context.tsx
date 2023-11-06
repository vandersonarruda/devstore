'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

// 6. Criar uma interface para o item
interface CartItem {
  productId: number
  quantity: number
}

// 2. Define tipos para o contexto do carrinho
interface CartContextType {
  // 5. o items será um array com duas tipagens, precisa de uma interface
  items: CartItem[]
  addToCart: (productId: number) => void
}

// 1. Criar o context
const CartContext = createContext({} as CartContextType)

// 3. Exporta CartProvider com o estado inicial (array vazio) e funções do carrinho
export function CartProvider({ children }: { children: ReactNode }) {
  // 7. Cria o estado inicial do carrinho
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // 8. Cria a função para adicionar um item ao carrinho
  function addToCart(productId: number) {
    setCartItems((state) => {
      // 9. Verifica se o produto já existe no carrinho
      const productInCart = state.some((item) => item.productId === productId)

      // 10. Se existir, incrementa a quantidade
      if (productInCart) {
        return state.map((item) => {
          // 12. Precorre o array e se encontrar o produto, incrementa a quantidade
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            // 13. Se não encontrar, retorna o item
            return item
          }
        })
      } else {
        // 11. Se não existir, adiciona o produto ao carrinho
        return [...state, { productId, quantity: 1 }]
      }
    })
  }

  return (
    // 9. Retorna o provider com o valor do estado e a função
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

// 4. Exporta o hook useCart para acesso ao contexto do carrinho
export const useCart = () => useContext(CartContext)
