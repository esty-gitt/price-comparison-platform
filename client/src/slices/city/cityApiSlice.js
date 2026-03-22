import apiSlice from "../apiSlice"
const cityApiSlice =apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCities: builder.query({
            query: () => '/city',
        }),
        getCityById: builder.query({
            query: (id) => `/city/${id}`,
        }),
        addCity: builder.mutation({
            query: (newCity) => ({
                url: '/city',
                method: 'POST',
                body: newCity,
            }),
        }),
        updateCity: builder.mutation({
            query: ({ id, ...updatedCity }) => ({
                url: `/city/${id}`,
                method: 'PUT',
                body: updatedCity,
            }),
        }),
        deleteCity: builder.mutation({
            query: (id) => ({
                url: `/city/${id}`,
                method: 'DELETE',
            }),
        }),
    })
})
export const {
    useGetCitiesQuery,
    useGetCityByIdQuery,
    useAddCityMutation,
    useUpdateCityMutation,
    useDeleteCityMutation
} = cityApiSlice
export default cityApiSlice