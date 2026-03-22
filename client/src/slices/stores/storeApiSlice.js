import apiSlice from "../apiSlice";
const storeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addStore: builder.mutation({
            query: (store) => ({
                url: 'store/',
                method: 'POST',
                body: store,
            }),
        }),
        updataStore: builder.mutation({
            query: (store) => ({
                url: 'store/',
                method: 'put',
                body: store,
            }),
        }),
        getListStoreByTotalPrice: builder.mutation({
            query: (cityIdAndItems) => ({
                url: 'store/ListStoreByPrice',
                method: 'POST',
                body: cityIdAndItems,
            }),
        }),
        deleteStore: builder.mutation({
            query: (_id) => ({
                url: `store/${_id}`,
                method: 'DELETE',
            }),
        }),
        getStores: builder.query({
            query: () => ({url:'store',
                // provideTags: (result) =>
                //     result
                //         ? [
                //               ...result.map(({ _id }) => ({ type: 'Store', id: _id })),
                //               { type: 'Store', id: 'LIST' },
                //           ]
                //         : [{ type: 'Store', id: 'LIST' }],
            }

            ),
        }),
        getStoresById: builder.query({
            query: (_id) => `store/${_id}`,
        }),
    }),
})
export const { useAddStoreMutation, useUpdataStoreMutation, useGetListStoreByTotalPriceMutation, useDeleteStoreMutation, useGetStoresQuery ,useGetStoresByIdQuery} = storeApiSlice;
