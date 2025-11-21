import { lazy } from "react";

// lazy imports
const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../pages/Login"));
const PlaceOrder = lazy(() => import("../pages/PlaceOrder"));
const Product = lazy(() => import("../pages/Product"));
const About = lazy(() => import("../pages/About"));
const Collection = lazy(() => import("../pages/Collection"));
const Orders = lazy(() => import("../pages/Orders"));

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CART: "/cart",
  COLLECTION: "/collection",
  CONTACT: "/contact",
  LOGIN: "/login",
  ORDERS: "/orders",
  PLACE_ORDER: "/place-order",
  PRODUCT: "/product/:id",
};

// config array
export const appRoutes = [
  { path: ROUTES.HOME, element: Home, protected: false },
  { path: ROUTES.ABOUT, element: About, protected: false },
  { path: ROUTES.CART, element: Cart, protected: false },
  { path: ROUTES.COLLECTION, element: Collection, protected: false },
  { path: ROUTES.CONTACT, element: Contact, protected: false },
  { path: ROUTES.LOGIN, element: Login, protected: false },
  { path: ROUTES.ORDERS, element: Orders, protected: true },
  { path: ROUTES.PLACE_ORDER, element: PlaceOrder, protected: true },
  { path: ROUTES.PRODUCT, element: Product, protected: false },
];



