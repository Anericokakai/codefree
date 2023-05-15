import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "../features/UsersSlice";
import storage from 'redux-persist/lib/storage'
import {persistStore,persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'




const persistConfig={
  key:'root',
  storage,
}

const persistedReducer=persistReducer(persistConfig,UsersSlice)

export const store=configureStore({
  reducer:{
    userInfo:persistedReducer,

  middleware:[thunk] }
})
export const persistor=persistStore(store)


