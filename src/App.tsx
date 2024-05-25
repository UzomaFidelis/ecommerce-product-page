import { useMemo, useReducer } from "react";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";
import productData from "./data.json";
import { AppAction, AppState, CartItem, Product } from "./types";

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "add-to-cart": {
      const productToAdd = action.payload.product;
      const itemIsInCart = state.cartItems.some(
        (item) => item.productId === productToAdd.id,
      );
      if (itemIsInCart) {
        const itemInCart = state.cartItems.find(
          (item) => item.productId === productToAdd.id,
        );
        const itemInCartIndex = state.cartItems.findIndex(
          (item) => item.productId === productToAdd.id,
        );

        if (itemInCart && itemInCartIndex !== undefined) {
          const newCartItem = {
            ...itemInCart,
            units: itemInCart.units + action.payload.units,
          };
          const stateCartItemsCopy = [...state.cartItems];
          stateCartItemsCopy[itemInCartIndex] = newCartItem;
          return { ...state, cartItems: stateCartItemsCopy };
        }
      }

      const newCartItem: CartItem = {
        productId: productToAdd.id,
        name: productToAdd.name,
        price: productToAdd.discountPrice,
        units: action.payload.units,
        image: productToAdd.thumbnailImageUrls[0],
      };
      const newCartItemsArr = [...state.cartItems, newCartItem];
      return { ...state, cartItems: newCartItemsArr };
    }

    case "remove-from-cart": {
      const itemToRemoveIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.id,
      );
      const cartItemsCopy = [...state.cartItems];
      cartItemsCopy.splice(itemToRemoveIndex, 1);

      return {
        ...state,
        cartItems: cartItemsCopy,
      };
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { cartItems: [] });
  const numCartItems = useMemo(() => {
    return state.cartItems.reduce((acc, item) => acc + item.units, 0);
  }, [state.cartItems]);

  const addToCart = (product: Product, units: number) => {
    dispatch({ type: "add-to-cart", payload: { product, units } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "remove-from-cart", payload: { id } });
  };

  return (
    <div className="app">
      <Header
        cartProducts={state.cartItems}
        removeFromCartFn={removeFromCart}
        cartItemsNum={numCartItems}
      />
      <ProductPage product={productData.products[0]} addToCartFn={addToCart} />
    </div>
  );
}

export default App;
