import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totoalprice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { payload } = action;

      const itemAlreadyInCart = state.items.find(
        (product) => product.id === payload.id
      );
      if (itemAlreadyInCart) {
        const updatedState = state.items.map((item) => {
          if (item.id === payload.id) {
            {
              return { ...item, quantity: item.quantity + 1 };
            }
          } else {
            return { ...item };
          }
        });
        state.items = [...updatedState];
      } else {
        state.items.push(payload);
      }
      if (state.items.length > 0) {
        let temp = 0;
        state.items.forEach((item) => {
          temp += (item.price / 100) * item.quantity;
        });
        state.totoalprice = temp;
      } else {
        state.totoalprice = 0;
      }
    },
    removeItem: (state, action) => {
      const { payload } = action;

      const itemAlreadyInCart = state.items.find(
        (product) => product.id === payload.id
      );
      if (itemAlreadyInCart) {
        const updateditemQuantity = state.items.map((item) => {
          if (item.id === payload.id) {
            {
              return { ...item, quantity: item.quantity - 1 };
            }
          } else {
            return { ...item };
          }
        });
        const itemsWithQuantity = updateditemQuantity.filter(
          (item) => item.quantity >= 1
        );
        state.items = [...itemsWithQuantity];
      }
      if (state.items.length > 0) {
        let temp = 0;
        state.items.forEach((item) => {
          temp += (item.price / 100) * item.quantity;
        });
        state.totoalprice = temp;
      } else {
        state.totoalprice = 0;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
