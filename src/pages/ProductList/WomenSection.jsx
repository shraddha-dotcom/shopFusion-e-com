import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import FilterProducts from '../Products/FilterProducts';
// import ProductList from '../Products/ProductList';
import { getWomenProducts } from '../../redux/action';

const WomenSection = () => {
  const dispatch = useDispatch();
  const womenProducts = useSelector((state) => state.products || []);

  useEffect(() => {
    dispatch(getWomenProducts());
  }, [dispatch]);

  if (!womenProducts || womenProducts.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4 mt-4 pt-24">Women&apos;s Section</h1>

      <React.Suspense fallback={<div>Loading...</div>}>
        <FilterProducts allProducts={womenProducts} />
      </React.Suspense>
    </div>
  );
};

export default WomenSection;
