import apiSlice from "../apiSlice";
 const productApiSlice=apiSlice.injectEndpoints({
  endpoints: (builder) => ({  
     addProduct: builder.mutation({
            query: (product) => ({
                url: 'product/',
                method: 'POST',
                body: product,
            }),
        }),
         updataProduct: builder.mutation({
            query: (product) => ({
                url: 'product/',
                method: 'put',
                body: product,
            }),
        }),
            deleteProduct: builder.mutation({
            query: (_id) => ({
                url: `product/${_id}`,
                method: 'DELETE',
            }),
        }),
          getProduct: builder.query({
            query: () => ({url:'product',
            }

            ),
        }),
         getProductById: builder.query({
            query: (_id) => `product/${_id}`,
        }),
    })})
     export const { useAddProductMutation, useUpdataProductMutation, useDeleteProductMutation, useGetProductQuery, useGetProductByIdQuery } = productApiSlice;