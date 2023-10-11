import { configureStore } from "@reduxjs/toolkit";

import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import offcanvasSlice from "../features/common/offcanvasSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import { categoryApi } from "../services/categoryApi";
import { productApi } from "../services/productApi";
import { countryApi } from "../services/countryApi";
import { brandApi } from "../services/brandApi";
import { charactericApi } from "../services/characteristicApi";
import { sellerApi } from "../services/sellerApi";
import { modelApi } from "../services/modelApi";
import { proposalApi } from "../services/proposalApi";
import { topCategoryApi } from "../services/topCategoryApi";
import { topProductApi } from "../services/topProductApi";
import { adsProductApi } from "../services/adsProductApi";
import { bannerApi } from "../services/bannerApi";
import ProductReducer from "../features/products/productSlice";
import ProposalReducer from "../features/proposals/proposalSlice";
import CharacterReducer from "../features/products/components/CharacteristicsSection/characterSlice";
import CategoryReducer from "../features/categories/categorySlice"

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  offcanvas: offcanvasSlice,
  product: ProductReducer,
  proposal: ProposalReducer,
  character: CharacterReducer,
  categories: CategoryReducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [countryApi.reducerPath]: countryApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [charactericApi.reducerPath]: charactericApi.reducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  [modelApi.reducerPath]: modelApi.reducer,
  [proposalApi.reducerPath]: proposalApi.reducer,
  [topCategoryApi.reducerPath]: topCategoryApi.reducer,
  [topProductApi.reducerPath]: topProductApi.reducer,
  [adsProductApi.reducerPath]: adsProductApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
};

export default configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // logger,
      categoryApi.middleware,
      productApi.middleware,
      countryApi.middleware,
      brandApi.middleware,
      sellerApi.middleware,
      charactericApi.middleware,
      modelApi.middleware,
      proposalApi.middleware,
      topCategoryApi.middleware,
      topProductApi.middleware,
      adsProductApi.middleware,
      bannerApi.middleware,
    ),
});

