import * as actions from "./actionTypes";

export const initialState = {
  products: [],
  wishlist: [],
  cart: [],
  loading : false,
  error: null,
  filteredProducts: [],
  user: [],
  AllProducts:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.GET_MEN_PRODUCTS:
    case actions.GET_WOMEN_PRODUCTS:
    case actions.GET_KIDS_PRODUCTS:
    case actions.GET_ELECTRONICS_PRODUCTS:
    case actions.GET_HOMEDECOR_PRODUCTS:
   
      return { ...state, products: action.payload };

    // add to cart
            case actions.ADD_TO_CART: {
            return {
                  ...state,
                   cart: state.cart.some((product) => product.id === action.payload.id)
                          ? state.cart.map((product) =>
                              product.id === action.payload.id
                                  ? { ...product, quantity: product.quantity + 1 }
                                  : product
                            )
                          : [...state.cart, { ...action.payload, quantity: 1 }],
                  };
              }
                
                //  remove from cart
             case actions.REMOVE_FROM_CART: {
                    const productInCart = state.cart.find(
                      (product) => product.id === action.payload
                    );
                  
              return productInCart && productInCart.quantity > 1
                 ? {
             ...state,
              cart: state.cart.map((product) =>
              product.id === action.payload
                ? { ...product, quantity: product.quantity - 1 }
                : product
            ),
          }
        : { ...state,
            cart: state.cart.filter((product) => product.id !== action.payload),
          };
    }
                  
                  
                  // remove all product from cart
             case actions.REMOVE_ALL_FROM_CART:
             return { ...state, cart: state.cart.filter((product) => product.id !== action.payload) };
             
              // update the quantity
                  case actions.UPDATE_QUANTITY:
                    return {
                      ...state,
                      cart: state.cart.map((product) => product.id === action.payload.productId
                       ? {...product , quantity: action.payload.quantity}
                       : product
                       )
                    }

                    // add to wishlist
                    case actions.ADD_TO_WISHLIST:
                      // Check if the item is already in the wishlist, and if so, increase the quantity
                      const existingProductIndex = state.wishlist.findIndex(product => product.id === action.payload.id);
                      if (existingProductIndex >= 0) {
                         // Update the quantity if the product is already in the wishlist
                         const updatedWishlist = [...state.wishlist];
                         updatedWishlist[existingProductIndex].quantity += action.payload.quantity || 1;
                         return { ...state, wishlist: updatedWishlist };
                      } else {
                         // Add new product if it's not in the wishlist
                         return { ...state, wishlist: [...state.wishlist, { ...action.payload, quantity: action.payload.quantity || 1 }] };
                      }
                   
                      // remove from wishlist
                      case actions.REMOVE_FROM_WISHLIST:
                        const productInWishlist = state.wishlist.find((product) => product.id === action.payload);
                        return productInWishlist && productInWishlist.quantity > 1
                           ? {
                               ...state,
                               wishlist: state.wishlist.map((product) =>
                                 product.id === action.payload
                                   ? { ...product, quantity: product.quantity - 1 }
                                   : product
                               ),
                             }
                           : {
                               ...state,
                               wishlist: state.wishlist.filter((product) => product.id !== action.payload),
                             };
                     
                              // all products
             case actions.FETCH_ALL_PRODUCTS: 
             return{...state , AllProducts: action.payload}
              //  filters
             case actions.APPLY_FILTERS:
                  return{...state , filteredProducts: action.payload}

                  // add user
                  case actions.ADD_USER:
                    return {
                      ...state,
                      user: [...state.user , action.payload]
                    }

                case actions.GET_ERROR:
                  return{...state, error: action.payload , loading: false}

    default:
      return state;
  }
};

export default reducer;
