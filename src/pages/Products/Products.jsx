import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/action';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";


const Products = () => {
  const dispatch = useDispatch();
  const trendingProducts = useSelector(state => state.products || {});
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch]);


  const trendingProductData = trendingProducts.length ? (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-3 
      md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
        {trendingProducts.map((product) => {

          return (
            <div key={product.id}
              data-aos='fade-up'
              data-aos-delay={product.aosDelay}
              className="flex flex-col items-center 
                 border p-4 rounded-2xl shadow-xl
                 dark:bg-black hover:bg-gray-200 dark:hover:bg-primary
                 hover:text-white relative duration-300 group max-w-[300px] ">
              <Link to={`/product/${product.category}/${product.id}`}>

                <img src={product.images?.[0] || product.thumbnail} alt={product.title}
                  className="w-full h-48 object-contain rounded-full
                  block mx-auto
                  transform -translate-y-5 group-hover:scale-105 duration-100 
                  drop-shadow-md"
                  loading="lazy" // Lazy load the image
                />


              </Link>
              <h3 className="text-center text-sm font-semibold  dark:text-white">{product.title}</h3>
              <p className='text-sm text-gray-500 dark:text-white'>Price: $ {product.price}</p>
              <div className='flex gap-1'>
                <FaStar className="text-yellow-400 size-4" />
                <span className='text-gray-500 dark:text-white text-sm'>{product.rating}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  ) : (<p>Loading...</p>)


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 data-aos="fade-up" className="text-2xl font-bold text-center mb-6"> Top Selling Products</h1>
      {trendingProductData}

    </div>
  )
}

export default Products
