import {
    createSlice
} from "@reduxjs/toolkit";

// const initialState = {
//     products: localStorage.getItem("products")
//       ? JSON.parse(localStorage.getItem("products"))
//       : [],
//       quantity: 0,
//       total: 0,
//   };
const initialState = {
    products: [],
      quantity: 0,
      total: 0,
  };


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addProduct:(state,action)=>{
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        addToCart(state, action) {
            const itemIndex = state.products.findIndex(
                (item) => item.id === action.payload.id
              );
              // Si ya hay un producto en el carrito con ese id obtenido devuelve el id.
            // Si el id es mayor a 0 entonces procedemos a sumar los productos iguales
            if(itemIndex){
                state.products[itemIndex].quantity += 1;
            }

          },
          decreaseCart:(state,action)=>{
            const itemIndex = state.products.findIndex(
                (item) => item.id === action.payload.id
              );
        
              if (state.products[itemIndex].quantity > 1) {
                state.products[itemIndex].quantity -= 1;
              } else if (state.products[itemIndex].quantity === 1) {
                const nextCartItems = state.products.filter(
                  (item) => item.id !== action.payload.id
                );
        
                state.products = nextCartItems;
                state.quantity -= 1;
                state.total -= action.payload.price * action.payload.quantity;
                
              }
        
        },
        removeAllProducts:(state)=>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        removeFromCart(state, action){
            const nextCartItems = state.products.filter((products) => products._id !== action.payload._id)
            state.products = nextCartItems;
            state.quantity -= 1;
            state.total -= action.payload.price * action.payload.quantity;

        //     state.products.map((product) => {
        //         if (product._id === action.payload.id) {
        //           const nextCartItems = state.products.filter(
        //             (item) => item._id !== product._id
        //           );
        //           state.products = nextCartItems;
        //           state.quantity -= 1;
        //           state.total -= action.payload.price * action.payload.quantity;
        //         }
        //         return state;
               
        // });
    },
},
    
});


export const {addProduct, decreaseCart, removeAllProducts, removeFromCart,addToCart} = cartSlice.actions
export default cartSlice.reducer;