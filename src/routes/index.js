// All components mapping with path for internal routes

import { lazy } from 'react'
const AddProductSku = lazy(() => import('../pages/protected/AddProductSku'))
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Categories = lazy(() => import('../pages/protected/Categories'))
const Products = lazy(() => import('../pages/protected/Products'))
const CategoryDetail = lazy(() => import('../pages/protected/CategoryDetail'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const AddProducts = lazy(() => import('../pages/protected/CreateProduct'))
const Proposals = lazy(() => import('../pages/protected/Proposals'))


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
    path: '/products/add',
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
  //   path: '/products/:productId',
  //   component: CategoryDetail,
  // },
  // {
  //   path: '/welcome', // the url
  //   component: Welcome, // view rendered
  // },
  // {
  //   path: '/settings-team',
  //   component: Team,
  // },
  // {
  //   path: '/calendar',
  //   component: Calendar,
  // },
  // {
  //   path: '/transactions',
  //   component: Transactions,
  // },
  // {
  //   path: '/settings-profile',
  //   component: ProfileSettings,
  // },
  // {
  //   path: '/settings-billing',
  //   component: Bills,
  // },
  // {
  //   path: '/getting-started',
  //   component: GettingStarted,
  // },
  // {
  //   path: '/features',
  //   component: DocFeatures,
  // },
  // {
  //   path: '/components',
  //   component: DocComponents,
  // },
  // {
  //   path: '/integration',
  //   component: Integration,
  // },
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  {
    path: '/404',
    component: Page404,
  },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default routes
