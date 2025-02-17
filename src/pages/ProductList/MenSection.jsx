import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getMenProducts } from '../../redux/action';
import FilterProducts from '../Products/FilterProducts';


const MenSection = () => {

  const dispatch = useDispatch();
  const menProducts = useSelector((state) => state.products || []);
  // console.log(menProducts)

  useEffect(() => {
    dispatch(getMenProducts());

  }, [dispatch]);


  if (!menProducts || menProducts.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4 mt-4 pt-24 text-gray-800">Men&apos;s Section</h1>
      <FilterProducts allProducts={menProducts} />
    </div>
  );
};

export default MenSection;


