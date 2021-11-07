import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = `https://my-json-server.typicode.com/ganeshmani/rtk-getting-started-tutorial`;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => `/products/`,
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: `/products`,
          method: "POST",
          body,
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
