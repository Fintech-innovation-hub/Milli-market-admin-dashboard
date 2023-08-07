import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
// import leadsSlice from '../features/leads/leadSlice'
import { categoryApi } from '../services/categoryApi'
import { productApi } from '../services/productApi'
import { countryApi } from '../services/countryApi'
import { brandApi } from '../services/brandApi'
import { charactericApi } from '../services/characteristicApi'
import { sellerApi } from '../services/sellerApi'
import { modelApi } from '../services/modelApi'
import ProductReducer from '../features/products/productSlice'

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  product:ProductReducer,
  // category: leadsSlice,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [countryApi.reducerPath]: countryApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [charactericApi.reducerPath]: charactericApi.reducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  [modelApi.reducerPath]: modelApi.reducer,
}

export default configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(categoryApi.middleware, productApi.middleware,
      countryApi.middleware, brandApi.middleware, sellerApi.middleware,
      charactericApi.middleware,modelApi.middleware),
})