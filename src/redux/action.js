import * as actions from "./actionTypes"


// Men products api call

export const getMenProducts = () => {
  return async (dispatch) => {  //  Return async function
    try {
      console.log("getMenProducts action called!");

      const [shirts, shoes, watches] = await Promise.all([
        fetch("https://dummyjson.com/products/category/mens-shirts").then((res) => res.json()),
        fetch("https://dummyjson.com/products/category/mens-shoes").then((res) => res.json()),
        fetch("https://dummyjson.com/products/category/mens-watches").then((res) => res.json()),
      ]);

      console.log("Fetched data:", { shirts, shoes, watches });

      dispatch({
        type: actions.GET_MEN_PRODUCTS,
        payload: [...shirts.products, ...shoes.products, ...watches.products], // Merge categories
      });
    } catch (error) {
      console.error("Error fetching men products:", error);
    }
  };
};


// Women Product api call

export const getWomenProducts = () => {
  return async (dispatch) => {  // Return async function
    try {
      console.log("getWomenProducts action called!");

      const [dressesData, bagsData] = await Promise.all([
        fetch("https://dummyjson.com/products/category/womens-dresses").then((res) => res.json()),
        fetch("https://dummyjson.com/products/category/womens-bags").then((res) => res.json()),
      ]);

      console.log("Fetched data:", { dressesData, bagsData });

      dispatch({
        type: actions.GET_WOMEN_PRODUCTS,
        payload: [...dressesData.products, ...bagsData.products], //  Merge both categories
      });
    } catch (error) {
      console.error("Error fetching women products:", error);
    }
  };
};

// kids api call

export const getKidsProducts = () => {
  return (dispatch) => {
    fetch("https://dummyjson.com/products/category/tops")
      .then((res) => res.json()) 
      .then((data) => {
        console.log("Fetched data:", data); 
        dispatch({
          type: actions.GET_KIDS_PRODUCTS,
          payload: data.products,
        });
      })
      .catch((error) => {
        console.error("Error fetching KIDS products:", error);
      });
  };
};

// electronics api
export const getElectronicProducts = () => {
  return (dispatch) => {
    fetch("https://dummyjson.com/products/category/laptops")
      .then((res) => res.json()) 
      .then((data) => {
        console.log("Fetched data:", data); 
        dispatch({
          type: actions.GET_ELECTRONICS_PRODUCTS,
          payload: data.products,
        });
      })
      .catch((error) => {
        console.error("Error fetching electronic products:", error);
      });
  };
};

// homeDecor api
export const getHomedecorProducts = () => {
  return (dispatch) => {
    fetch("https://dummyjson.com/products/category/furniture")
      .then((res) => res.json()) 
      .then((data) => {
        console.log("Fetched data:", data); 
        dispatch({
          type: actions.GET_HOMEDECOR_PRODUCTS,
          payload: data.products,
        });
      })
      .catch((error) => {
        console.error("Error fetching homedecor products:", error);
      });
  };
};

// all products api
export const fetchAllProducts = () => {
  return (dispatch) => {
   fetch("https://dummyjson.com/products") //  Return fetch Promise
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data && data.products) {
          const randomProducts = getRandomItems(data.products, 12);
          dispatch({
            type: actions.GET_ALL_PRODUCTS,
            payload: randomProducts,
          });
        } else {
          console.error("No products found in API response");
        }
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  };
};


// Helper function to get a random subset of items from an array
const getRandomItems = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random()); 
  return shuffled.slice(0, count); 
};

// Action to add product to cart
export const addToCart = (product) => {
  return {
    type: actions.ADD_TO_CART,
    payload: product,
  };
};

// Action to remove product from cart
export const removeFromCart = (productId) => {
  return {
    type: actions.REMOVE_FROM_CART,
    payload: productId,
  };
};

// update product quantity
export const updateQuantity = (productId , quantity) => {
  return {
    type: actions.UPDATE_QUANTITY,
    payload: {productId , quantity},
  }
}

// Action to add product to wishlist
export const addToWishlist = (product) => {
  return {
    type: actions.ADD_TO_WISHLIST,
    payload: product,
  };
};

// Action to remove product from wishlist
export const removeFromWishlist = (productId) => {
  return {
    type: actions.REMOVE_FROM_WISHLIST,
    payload: productId,
  };
};

// add user data
export const addUser = (user) => ({
  type : actions.ADD_USER,
  payload: user,
})


//       "https://dummyjson.com/products/category/groceries",
//       "https://dummyjson.com/products/category/laptops",
//       "https://dummyjson.com/products/category/smartphones",
//       "https://dummyjson.com/products/category/tablets",
//       "https://dummyjson.com/products/category/mobile-accessories",
//       "https://dummyjson.com/products/category/furniture",
//       "https://dummyjson.com/products/category/home-decoration",
//       "https://dummyjson.com/products/category/kitchen-accessories",
//       "https://dummyjson.com/products/category/sports-accessories",
//       "https://dummyjson.com/products/category/sunglasses",
//       "https://dummyjson.com/products/category/mens-shirts",
//       "https://dummyjson.com/products/category/mens-shoes",
//       "https://dummyjson.com/products/category/mens-watches",
//       "https://dummyjson.com/products/category/womens-dresses",
//       "https://dummyjson.com/products/category/Womens-shoes",
//       "https://dummyjson.com/products/category/Womens-watches",
//       "https://dummyjson.com/products/category/Womens-bags",
//       "https://dummyjson.com/products/category/Womens-jewellery",
//       "https://dummyjson.com/products/category/beauty",
//       "https://dummyjson.com/products/category/fragrances",
//       "https://dummyjson.com/products/category/skin-care",
//    