import apiSlice from "../apiSlice";
const shoppingListApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addShoppingList: builder.mutation({
            query: (shoppingList) => ({
                url: 'shoppingList/',
                method: 'POST',
                body: shoppingList,
            }),
        }),
        updataShoppingList: builder.mutation({
            query: (shoppingList) => ({
                url: 'shoppingList/',
                method: 'put',
                body: shoppingList,
            }),
        }),
        deleteShoppingList: builder.mutation({
            query: (_id) => ({
                url: `ShoppingList/${_id}`,
                method: 'DELETE',
            }),
        }),
        getShoppingList: builder.query({
            query: () => ({url:'ShoppingList',
                // provideTags: (result) =>
                //     result
                //         ? [
                //               ...result.map(({ _id }) => ({ type: 'ShoppingList', id: _id })),
                //               { type: 'ShoppingList', id: 'LIST' },
                //           ]
                //         : [{ type: 'ShoppingList', id: 'LIST' }],
            }

            ),
        }),
        getShoppingListById: builder.query({
            query: (_id) => `ShoppingList/${_id}`,
        }),
        getShoppingListByUserId: builder.query({
            query: (_id) => `ShoppingList/userId/${_id}`,
        }),
    }),
})
export const { useAddShoppingListMutation, useUpdataShoppingListMutation, useDeleteShoppingListMutation, useGetShoppingListByIdQuery ,useGetShoppingListQuery,useGetShoppingListByUserIdQuery} = shoppingListApiSlice;
