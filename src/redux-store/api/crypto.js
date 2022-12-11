// redux-toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getOverflowOptions } from 'antd/es/_util/placements';

// RapidAPi = Coinranking
// https://rapidapi.com/Coinranking/api/coinranking1?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=DevRel&utm_campaign=DevRel
const options = {
    'X-RapidAPI-Key': 'ff01b51037msh90266f52c1f1db1p1d3494jsnc84434e26ce9',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

// create request
const createRequest = (url) => ({ url, headers: options })

// redux
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://coinranking1.p.rapidapi.com',
    }),

    endpoints: (builder) => ({
        getCryptoCoin: builder.query({ query: (count) => createRequest(`/coins?limit=${count}`)}),
        getCryptoDetails: builder.query({ query: (coinId) => createRequest(`/coin/${coinId}`) }),
        getCryptoHistory: builder.query({ query: ({ coinId, timePeriod} ) => createRequest(`coin/${coinId}/history?timeperiod=${timePeriod}`) })
    })
})

export const {
    useGetCryptoCoinQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;
