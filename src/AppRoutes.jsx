
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropTypes from 'prop-types';
import About from './components/About/About';
import ContactUs from './components/contactUs/ContactUs';
import Faq from './components/FAQ/Faq';



// lazy loading component
const Home = lazy(() => import("./pages/Home"));
const MenSection = lazy(() => import("./pages/ProductList/MenSection"));
const WomenSection = lazy(() => import("./pages/ProductList/WomenSection"));
const KidsSection = lazy(() => import("./pages/ProductList/KidsSection"));
const Electronics = lazy(() => import("./pages/ProductList/Electronics"));
const HomeDecor = lazy(() => import("./pages/ProductList/HomeDecor"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const WishlistPage = lazy(() => import("./pages/Wishlist/WishlistPage"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./components/LoginSignUp/Login"));
const SignUp = lazy(() => import("./components/LoginSignUp/SignUp"));
const NotFoundPage = lazy(() => import("./NotFound/NotFoundPage"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"))


const ScrollToTop = () => {
  const location = useLocation()
  useEffect(() => {
    // console.log(location)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }, [location]);
  return null;
};

const Layout = ({ children }) => {
  const location = useLocation();
  // console.log(location)
  const hideNavFooter = ["/login", "/signup"].includes(location.pathname);
  return (
    <>
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

const AppRoutes = () => {

  return (
    <div className='flex flex-col min-h-screen'>
      <Layout>
        <ScrollToTop />
        <Suspense fallback={
          <div className="flex justify-center m-4">
            <div className="w-16 h-16 border-4 border-blue-500
                        border-t-transparent rounded-full 
                        animate-spin">

            </div>
          </div>
        }>
          <main className='flex-grow'>

            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Men" element={<MenSection />} />
              <Route path="/Women" element={<WomenSection />} />
              <Route path="/Kids" element={<KidsSection />} />
              <Route path="/Electronics" element={<Electronics />} />
              <Route path="/HomeDecor" element={<HomeDecor />} />
              <Route path="/" element={<Products />} />
              <Route path="/product/:category/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/wishlist-page" element={<WishlistPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart-page" element={<CartPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/about-us" element={<About />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/faq" element={<Faq />} />
              {/* unavailable routes */}
              <Route path='*' element={<Navigate to="/not-found" replace />} />
              {/* fallback to not found page */}
              <Route path='/not-found' element={<NotFoundPage />} />



            </Routes>
          </main>

        </Suspense>


      </Layout>


    </div>









  );
};

export default AppRoutes;
