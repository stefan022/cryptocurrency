import { configureStore } from "@reduxjs/toolkit";

// crypto.js
import { cryptoApi } from './api/crypto'

// news.js
import { newsApi } from './api/news'

// Coinranking
export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware, newsApi.middleware),
})