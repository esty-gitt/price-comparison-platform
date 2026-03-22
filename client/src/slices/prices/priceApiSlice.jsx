import apiSlice from "../apiSlice";
const priceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addPrice: builder.mutation({
            query: (price) => ({
                url: 'price/',
                method: 'POST',
                body: price,
            }),
        }),
        updataPrice: builder.mutation({
            query: (price) => ({
                url: 'price/',
                method: 'put',
                body: price,
            }),
        }),
        deletePrice: builder.mutation({
            query: (_id) => ({
                url: `price/${_id}`,
                method: 'DELETE',
            }),
        }),
        getPrice: builder.query({
            query: () => ({url:'price/',
            }

            ),
        }),
        getPriceById: builder.query({
            query: (_id) => `price/${_id}`,
        }),
        
    }),
})
export const { useAddPriceMutation, useUpdataPriceMutation, useDeletePriceMutation, useGetPriceByIdQuery ,useGetPriceQuery} = priceApiSlice;
