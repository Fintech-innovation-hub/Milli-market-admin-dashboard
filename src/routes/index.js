
import { lazy } from 'react'
const AddProductSku = lazy(() => import('../pages/protected/AddProductSku'))
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Categories = lazy(() => import('../pages/protected/Categories'))
const Products = lazy(() => import('../pages/protected/Products'))
const CategoryDetail = lazy(() => import('../pages/protected/CategoryDetail'))
const AddProducts = lazy(() => import('../pages/protected/CreateProduct'))
const Proposals = lazy(() => import('../pages/protected/Proposals'))

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
    component: CategoryDetail,
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
