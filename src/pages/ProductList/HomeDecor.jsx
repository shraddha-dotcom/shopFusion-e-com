import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getHomedecorProducts } from '../../redux/action';
import FilterProducts from '../Products/FilterProducts';

const HomeDecor = () => {
  const dispatch = useDispatch();
  const homedecorProducts = useSelector(state => state.products);
  useEffect(() => {
    dispatch(getHomedecorProducts())
  }, [dispatch]);




  if (!homedecorProducts || homedecorProducts.length === 0) {
    return <p>No products available.</p>;
  }


  return (
    <div className="container mx-auto px-4 py-8 bg-orange-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4 mt-4 pt-24"> Home Decor</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <FilterProducts allProducts={homedecorProducts} />
      </React.Suspense>
    </div>
  )
}

export default HomeDecor