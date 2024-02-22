import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { ProductProps } from "@/utils/data/products"
import * as cartInMemory from "./helpers/cart-in-memory"

export type ProductCartProps = ProductProps & {
  quantity: number
  comment?: string
} 

type StateProps = {
  products: ProductCartProps[]
  add: (Product: ProductProps, comment: string, quantity: number) => void
  remove: (ProductId: string) => void
  clear: () => void
}

export const useCartStore = create(
  persist<StateProps>((set) =>({
  products: [],
  comment: "",
  quantity: 0,
  add: (product: ProductProps, comment: string, quantity: number) =>
    set((state) => ({
      products: cartInMemory.add(state.products, product, comment, quantity),
    })),
  remove: (productId: string) =>
    set((state) => ({
      products: cartInMemory.remove(state.products, productId),
    })),
  clear: () => set(() => ({ products: [] }))
  }), {
  name: "nlw-expert:cart",
  storage: createJSONStorage(() => AsyncStorage),
}))
