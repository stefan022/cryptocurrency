import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// RapidAPi = Bing News Search
const options = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'ff01b51037msh90266f52c1f1db1p1d3494jsnc84434e26ce9',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
};

// create-request
const createRequest = (url) => ({ url, headers: options });

// redux
export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://bing-news-search1.p.rapidapi.com',
    }),

    endpoints: (builder) => ({
        getNews: builder.query({ 
            query: ({ category, count }) => createRequest(`/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`) 
        })
    })
})

export const {
    useGetNewsQuery
} = newsApi;