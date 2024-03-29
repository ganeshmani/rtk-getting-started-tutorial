import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = `https://rtk-gettingstarted-backend.herokuapp.com/`;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => `/products/`,
      providesTags: ["Product"]
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: `/products`,
          method: "POST",
          headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
          },
          body
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/products/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useFetchAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApi;
