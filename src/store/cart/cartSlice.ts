import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export type CartItem = {
  /** The product ID or Parent ID if product have variants */
  id: string

  /** The cart item ID = `{sneaker.id}` `{variant.id}` - `{size}` */
  cartItemId: string
  quantity: number
  price: number
  title: string
  thumbnail: string
  size: number
  variantId?: string
}

export interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload
      const existingItem = state.items.find(
        (i) => i.cartItemId === item.cartItemId
      )

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.items.push(item)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const cartItemId = action.payload
      state.items = state.items.filter((item) => item.cartItemId !== cartItemId)
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        cartItemId: string
        quantity: number
      }>
    ) {
      const { cartItemId } = action.payload
      const existingItem = state.items.find((i) => i.cartItemId === cartItemId)
      if (existingItem) {
        existingItem.quantity = action.payload.quantity
      }
    },
    setInitialState(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
    },
  },
})

export const { addItem, removeItem, updateQuantity, setInitialState } =
  cartSlice.actions
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer
