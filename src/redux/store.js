// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import productReducer from "./productSlice";
// import categoryReducer from "./categorySlice";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   whitelist: ["auth", "product", "category"],
// };
// const rootReducer = combineReducers({
//   auth: authReducer,
//   product: productReducer,
//   category: categoryReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export let persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    myCart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export default store;
