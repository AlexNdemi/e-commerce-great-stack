import { lazy, } from "react";

// Lazy imports
const Home = lazy(() => import("../../pages/Home"));
const Register =lazy(() => import("../../pages/Register"))
const Cart = lazy(() => import("../../pages/Cart"));
const Contact = lazy(() => import("../../pages/Contact"));
const Login = lazy(() => import("../../pages/Login"));
const PlaceOrder = lazy(() => import("../../pages/PlaceOrder"));
const Product = lazy(() => import("../../pages/Product"));
const About = lazy(() => import("../../pages/About"));
const Collection = lazy(() => import("../../pages/Collection"));
const Orders = lazy(() => import("../../pages/Orders"));

// Route paths
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CART: "/cart",
  COLLECTION: "/collection",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER:"/register",
  ORDERS: "/orders",
  PLACE_ORDER: "/place-order",
  PRODUCT: "/product/:id",
} as const;

// Auth pages that should not be saved as return paths
export const AUTH_PAGES = [ROUTES.LOGIN,ROUTES.REGISTER] as const;

// Route configuration type
export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType>;
  protected: boolean;
  title?: string; // Optional page title for better UX
}

// Config array
export const appRoutes: RouteConfig[] = [
  { 
    path: ROUTES.HOME, 
    element: Home, 
    protected: false,
    title: "Home"
  },
  {
    path: ROUTES.REGISTER, 
    element: Register, 
    protected: false,
    title: "Register"
  },
  { 
    path: ROUTES.ABOUT, 
    element: About, 
    protected: false,
    title: "About Us"
  },
  { 
    path: ROUTES.CART, 
    element: Cart, 
    protected: false,
    title: "Shopping Cart"
  },
  { 
    path: ROUTES.COLLECTION, 
    element: Collection, 
    protected: false,
    title: "Collection"
  },
  { 
    path: ROUTES.CONTACT, 
    element: Contact, 
    protected: false,
    title: "Contact Us"
  },
  { 
    path: ROUTES.LOGIN, 
    element: Login, 
    protected: false,
    title: "Login"
  },
  { 
    path: ROUTES.ORDERS, 
    element: Orders, 
    protected: true,
    title: "My Orders"
  },
  { 
    path: ROUTES.PLACE_ORDER, 
    element: PlaceOrder, 
    protected: true,
    title: "Place Order"
  },
  { 
    path: ROUTES.PRODUCT, 
    element: Product, 
    protected: false,
    title: "Product Details"
  },
];

// Helper to check if a path is an auth page
export const isAuthPage = (pathname: string): boolean => {
  return AUTH_PAGES.some(authPath => pathname === authPath);
};