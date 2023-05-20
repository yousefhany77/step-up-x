import {
  CartItem,
  addItem,
  removeItem,
  selectCart,
  updateQuantity,
} from '@/store/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

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

  return { items, addToCart, removeFromCart, updateItemQuantity }
}
