import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (values) => ({
                url: 'api/user/login',
                method: 'post',
                headers:{'content-type': 'application/json'},
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(values)
            })
        }),
        register: builder.mutation({
            query: (values) => ({
                url: 'api/user/register',
                method: 'post',
                headers:{'content-type': 'application/json'},
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(values)
            })
        }),
    }),
})

export const { useRegisterMutation, useLoginMutation } = userApi;