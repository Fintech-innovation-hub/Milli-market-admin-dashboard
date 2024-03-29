
import { lazy } from 'react'
const AddProductSku = lazy(() => import('../pages/protected/AddProductSku'))
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Categories = lazy(() => import('../pages/protected/Categories'))
const Products = lazy(() => import('../pages/protected/Products'))
const ChildCategory = lazy(() => import('../pages/protected/ChildCategory'))
const AddProducts = lazy(() => import('../pages/protected/CreateProduct'))
const Proposals = lazy(() => import('../pages/protected/Proposals'))
const Banners = lazy(() => import('../pages/protected/Banners'))
const TopCategory = lazy(() => import('../pages/protected/TopCategory'))
const TopProduct = lazy(() => import('../pages/protected/TopProduct'))
const AdsProduct = lazy(() => import('../pages/protected/AdsProduct'))
const Orders = lazy(() => import('../pages/protected/Orders'))

// const Charts = lazy(() => import('../pages/protected/Charts'))
// const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))




const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/categories',
    component: Categories,
  },
  {
    path: '/categories/:categoryId',
    component: ChildCategory,
  },
  {
    path: '/products/all',
    component: Products,
  },
  {
    path: '/products/add/:productId',
    component: AddProducts,
  },
  {
    path: '/proposals',
    component: Proposals,
  },
  // /app/products/add
  {
    path: '/product/:id/sku',
    component: AddProductSku,
  },
  {
    path: '/topCategory',
    component: TopCategory,
  },
  {
    path: '/topProduct',
    component: TopProduct,
  },
  {
    path: '/adsProduct',
    component: AdsProduct,
  },
  {
    path: '/banner',
    component: Banners,
  },
  {
    path: '/orders',
    component: Orders,
  },
  // {
  //   path: '/settings-profile',
  //   component: ProfileSettings,
  // },
  // {
 
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  {
    path: '/404',
    component: Page404,
  },
 
]

export default routes
