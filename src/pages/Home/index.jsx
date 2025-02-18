
import Hero from '../../components/Hero/Hero';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from '../../components/Banner/Banner';
import Subscribe from '../../components/Banner/Subscribe'
import FlashSale from '../../components/Banner/FlashSale';
import Testimonial from '../../components/Banner/Testimonial';
import { useEffect } from 'react';
import TopSale from '../../components/Banner/TopSale';

const Index = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100
    });
    AOS.refresh()
  }, [])
  return (
    <div className='flex flex-col min-h-screen'>

      <Hero />
      <TopSale />
      <Banner />
      <Subscribe />
      <FlashSale />
      <Testimonial />
    </div>
  )
}

export default Index
