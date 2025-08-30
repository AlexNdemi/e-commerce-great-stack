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
  { path: ROUTES.HOME, element: Home },
  { path: ROUTES.ABOUT, element: About  },
  { path: ROUTES.CART, element: Cart  },
  { path: ROUTES.COLLECTION, element: Collection  },
  { path: ROUTES.CONTACT, element: Contact  },
  { path: ROUTES.LOGIN, element: Login  },
  { path: ROUTES.ORDERS, element: Orders  },
  { path: ROUTES.PLACE_ORDER, element: PlaceOrder  },
  { path: ROUTES.PRODUCT, element: Product  },
];


