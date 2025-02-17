import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getElectronicProducts } from '../../redux/action';
import FilterProducts from '../Products/FilterProducts';

const Electronics = () => {
  const dispatch = useDispatch();
  const electronicProducts = useSelector(state => state.products);
  useEffect(() => {
    dispatch(getElectronicProducts())
  }, [dispatch]);



  if (!electronicProducts || electronicProducts.length === 0) {
    return <p className="text-center text-lg font-semibold text-gray-600">No products available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4 pt-24 mt-4 text-gray-800">Electronic Items </h1>
      <React.Suspense fallback={<div className='text-center text-lg'>Loading...</div>}>
        <FilterProducts allProducts={electronicProducts} />
      </React.Suspense>
    </div>
  )
}

export default Electronics
