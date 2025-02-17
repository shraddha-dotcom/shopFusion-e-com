
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="mt-auto bg-orange-300 dark:bg-gray-900 text-black dark:text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Company</h3>
            <ul>
              <li>
                <Link to="/about-us" className="hover:text-yellow-400 transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">Careers</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">Press</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Support</h3>
            <ul>
              <li>
                <Link to="/contact-us" className="hover:text-yellow-400 transition-colors duration-300">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-yellow-400 transition-colors duration-300">FAQ</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-yellow-400 transition-colors duration-300">Returns & Exchanges</Link>
              </li>
            </ul>
          </div>

          {/*  Follow Us */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Link"
                  className="hover:text-yellow-400 transition-colors duration-300">
                  <svg className="h-8 w-8 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </li>
              <li>
                <a href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter Link"
                  className="hover:text-yellow-400 transition-colors duration-300">
                  <svg className="h-8 w-8 dark:text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                </a>
              </li>
              <li>
                <a href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Link"
                  className="hover:text-yellow-400 transition-colors duration-300">
                  <svg className="h-8 w-8 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom  */}
        <div className="text-center mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
