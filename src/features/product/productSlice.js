import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  apiState: {
    loading: false,
    error: null,
    isSuccess: false,
  },
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (thunkAPI) => {
    console.log("coming here");
    try {
      const response = await fetch(
        "https://rtk-gettingstarted-backend.herokuapp.com/products"
      );
      const products = await response.json();
      return products;
    } catch (e) {
      console.log("e", e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.products = payload;
      state.apiState.loading = false;
      state.apiState.isSuccess = true;
    },
    [fetchProducts.rejected]: (state, action) => {},
    [fetchProducts.pending]: (state, action) => {
      state.apiState.loading = true;
      state.apiState.isSuccess = false;
    },
  },
});

export const productSelector = (state) => state.products.products;

export const apiStateSelector = (state) => {
    console.log("apiStateSelector", state);
    return state.products.apiState
};

export default productsSlice;
