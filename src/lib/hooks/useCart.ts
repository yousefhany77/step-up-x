import {
  CartItem,
  addItem,
  removeItem,
  selectCart,
  setInitialState,
  updateQuantity,
} from '@/store/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

export const useCart = () => {
  const { items } = useAppSelector(selectCart)

  const dispatch = useAppDispatch()
  const addToCart = (item: CartItem) => dispatch(addItem(item))

  /**
   * remove item from cart
   * @param cartItemId
   */
  const removeFromCart = (cartItemId: string) =>
    dispatch(removeItem(cartItemId))

  /**
   * update item quantity
   * @param cartItemId
   * @param quantity
   */
  const updateItemQuantity = ({
    cartItemId,
    quantity,
  }: {
    cartItemId: string
    quantity: number
  }) => dispatch(updateQuantity({ cartItemId, quantity }))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart')
      if (cart) {
        const parsedCart = JSON.parse(cart) as CartItem[]
        dispatch(setInitialState(parsedCart))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (items.length !== 0) {
        localStorage.setItem('cart', JSON.stringify(items))
      }
    }
  }, [items])
  return { items, addToCart, removeFromCart, updateItemQuantity }
}
