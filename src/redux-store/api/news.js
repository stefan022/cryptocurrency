import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// RapidAPi = Bing News Search
// https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=DevRel&utm_campaign=DevRel
const options = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_NEWS,
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
