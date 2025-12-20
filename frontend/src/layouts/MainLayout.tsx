import { Outlet, Link, } from "react-router-dom";
import { ROUTES } from "../components/config/routes";
import Navbar from "../components/ui/Navbar";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/frontend_assets/assets";
import { useTheme } from "../hooks/useTheme";

/**
 * MainLayout - Layout wrapper for main application pages
 * 
 * Features:
 * - Navigation header with links
 * - User authentication status
 * - Cart icon, profile menu, etc.
 * - Consistent footer
 * 
 * This wraps your main app pages: Home, Collection, Cart, etc.
 */
const MainLayout = () => {
  const {theme}=useTheme()

  return (
    <div className="main-layout min-h-screen flex flex-col">

      {/* Main Content Area */}
      <main className="flex-1">
        <Navbar/>
        <Outlet />
        <NewsletterBox/>
      </main>

      {/* Footer */}
      <footer className={`mt-12`}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 - About */}
            <div>
              <img src={assets.logo} className={`mt-5 w-32 ${theme === 'dark'?'invert':''}`} alt="" />
              <p className={`text-sm ${theme === "dark"?"text-[#aaa]":"text-gray-600"}`}>
                Your trusted e-commerce platform for quality products.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3 className={`font-semibold mb-4 ${theme === "dark"?"":"text-[hsl(187,24%,22%)]"}`}>Quick Links</h3>
              <ul className={`space-y-2 text-sm`}>
                <li>
                  <Link to={ROUTES.HOME} className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.COLLECTION} className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>
                    Collection
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ABOUT} className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.CONTACT} className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Support */}
            <div>
              <h3 className={`font-semibold mb-4 ${theme === "dark"?"":"text-[hsl(187,24%,22%)]"}`}>Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div>
              <h3 className={`font-semibold mb-4 ${theme === "dark"?"":"text-[hsl(187,24%,22%)]"}`}>Get In Touch</h3>
              <ul className="flex flex-col">
                <li className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>+1-212-456-7890</li>
                <li className={`${theme === "dark"?"hover:text-[hsl(180,6%,95%)] text-[#aaa]":"text-gray-600 hover:text-[hsl(169,82%,27%)]"}`}>contact@foreveryou.com</li>
              </ul>
              {/* Add newsletter form here */}
            </div>
          </div>

          {/* Copyright */}
          <div className={`${theme==="dark"?"border-t border-[rgba(255,255,255,0.2)]  text-gray-600":"border-gray-300"} mt-8 pt-8 text-center text-sm `}>
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;