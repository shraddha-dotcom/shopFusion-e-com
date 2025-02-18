import * as actions from "./actionTypes"


// Men products api call

export const getMenProducts = () => {
  return async (dispatch) => {  //  Return async function
    try {
      // console.log("getMenProducts action called!");

      const [shirts, shoes, watches] = await Promise.all([
        fetch("https://dummyjson.com/products/category/mens-shirts").then((res) => res.json()),
        fetch("https://dummyjson.com/products/category/mens-shoes").then((res) => res.json()),
        fetch("https://dummyjson.com/products/category/mens-watches").then((res) => res.json()),
      ]);

      // console.log("Fetched data:", { shirts, shoes, watches });

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
      // console.log("getWomenProducts action called!");

      const [dressesData, bagsData] = await Promise.all([
        fetch("https://dummyjson.com/products/category/womens-dresses").then((res) => res.json()),
        fetch("https://dummyjson.com/products/category/womens-bags").then((res) => res.json()),
      ]);

      // console.log("Fetched data:", { dressesData, bagsData });

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
        // console.log("Fetched data:", data); 
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
  return async (dispatch) => {  // Return async function
    try {
      // console.log("getElectronicsProducts action called!");

      const [laptops , smartphones] = await Promise.all([
        fetch("https://dummyjson.com/products/category/laptops").then((res) => res.json()),
        fetch("https://dummyjson.com/products/category/smartphones").then((res) => res.json()),
      ]);

      // console.log("Fetched data:", { laptops , smartphones });

      dispatch({
        type: actions.GET_ELECTRONICS_PRODUCTS,
        payload: [...laptops.products, ...smartphones.products], //  Merge both categories
      });
    } catch (error) {
      console.error("Error fetching electronic products:", error);
    }
  };
};


// homeDecor api
export const getHomedecorProducts = () => {
  return (dispatch) => {
    fetch("https://dummyjson.com/products/category/furniture")
      .then((res) => res.json()) 
      .then((data) => {
        // console.log("Fetched data:", data); 
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
  return async (dispatch) => {
    try {
      let allProducts = [];
      let skip = 0;
      let limit = 100;
      let total = 0;

      // Fetch all products with pagination
      do {
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await res.json();

        allProducts = [...allProducts, ...data.products]; // Append new products
        total = data.total; // Get total available products
        skip += limit; // Increase offset for next batch

      } while (allProducts.length < total);

      // Additional category APIs to fetch
      const categoryUrls = [
        "https://dummyjson.com/products/category/mens-shirts",
        "https://dummyjson.com/products/category/womens-dresses",
        "https://dummyjson.com/products/category/mens-shoes",
      ];

      // Fetch all categories in parallel
      const categoryResponses = await Promise.all(categoryUrls.map(url => fetch(url)));
      const categoryData = await Promise.all(categoryResponses.map(res => res.json()));
      console.log("Category Data:", categoryData);
      // Extract products from each category
      const categoryProducts = categoryData.flatMap(data => data.products);
      console.log("category products" , categoryProducts)
      // Merge all products
      const combinedProducts = [...allProducts, ...categoryProducts];

      console.log("All fetched products:", combinedProducts.length);

      dispatch({
        type: actions.FETCH_ALL_PRODUCTS,
        payload: combinedProducts, 
      });

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
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

// remove all from cart
export const removeAllfromcart = (productId) => {
  return{
    type: actions.REMOVE_ALL_FROM_CART,
    payload:productId
  }
}

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


