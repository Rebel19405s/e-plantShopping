import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
  items: [], // Holds all cart items
};

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ Add item to cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from payload
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If item already exists, increment quantity
        existingItem.quantity++;
      } else {
        // If not, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // ✅ Remove item completely from cart
    removeItem: (state, action) => {
      // Filter out the item whose name matches the payload
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // ✅ Update quantity of a specific item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure product name and new quantity
      // Find the item in the cart
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update to new quantity
      }
    },
  },
});

// Export action creators for use in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export reducer for use in store.js
export default cartSlice.reducer;
